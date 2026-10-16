import type { CommerceLayerClient } from "@commercelayer/sdk"
import { expect, type Page, test } from "@playwright/test"
import { createOrder } from "../fixtures/functions/createOrder"
import { getClient } from "../fixtures/functions/getClient"
import { getSalesChannelToken } from "../fixtures/functions/getSalesChannelToken"

// A cross-origin page that plays the role of the outer container: it mounts
// the cart in an iframe through the iframe-resizer parent script, exactly as
// a storefront does, so the `update` message travels the real path.
const HOST_URL = "http://embed-host.localhost/"

const FIRST_SKU = "PLAINTSHIRT001"
const SECOND_SKU = "TSHIRTMS000000FFFFFFLXXX"

type CartIframe = HTMLIFrameElement & {
  iFrameResizer: { sendMessage: (message: unknown) => void }
}

const hostPage = (cartUrl: string) => `<!doctype html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js"></script>
  </head>
  <body>
    <iframe id="cart" src="${cartUrl}" style="width: 1024px; border: 0"></iframe>
    <script>
      window.cartReady = false
      iFrameResize(
        {
          log: false,
          onInit: () => {
            window.cartReady = true
          },
        },
        "#cart",
      )
    </script>
  </body>
</html>`

const mountEmbeddedCart = async ({
  page,
  baseURL,
  orderId,
  accessToken,
}: {
  page: Page
  baseURL: string
  orderId: string
  accessToken: string
}) => {
  const projectPath = process.env.PUBLIC_PROJECT_PATH
    ? `/${process.env.PUBLIC_PROJECT_PATH}`
    : ""
  const cartUrl = `${baseURL}${projectPath}/${orderId}?accessToken=${accessToken}`

  await page.route(HOST_URL, (route) =>
    route.fulfill({ contentType: "text/html", body: hostPage(cartUrl) }),
  )
  await page.goto(HOST_URL, { waitUntil: "domcontentloaded" })

  const cart = page.frameLocator("#cart")
  await expect(cart.locator("[data-test-id=total-amount]")).toBeVisible({
    timeout: 15_000,
  })
  // messages sent before the iframe-resizer handshake completes are dropped
  await page.waitForFunction("window.cartReady === true")

  return cart
}

const sendUpdateToCart = async (page: Page) => {
  await page.evaluate(() => {
    const iframe = document.querySelector("#cart") as CartIframe
    iframe.iFrameResizer.sendMessage({ type: "update" })
  })
}

const getSubtotalCents = async (cl: CommerceLayerClient, orderId: string) => {
  const order = await cl.orders.retrieve(orderId)
  return order.subtotal_amount_cents
}

test.describe("Embedded cart reloads when the outer container updates the order", () => {
  // The host page is served by `page.route`, so Chrome sees it as a public
  // origin framing `localhost` and asks for Local Network Access permission.
  // Granting it up front keeps the run unattended, headed or headless.
  test.use({ permissions: ["local-network-access"] })

  let cl: CommerceLayerClient
  let accessToken: string

  test.beforeEach(async () => {
    accessToken = await getSalesChannelToken()
    cl = await getClient(accessToken)
  })

  test("should show a line item added from the outer container", async ({
    page,
    baseURL,
  }) => {
    const { orderId } = await createOrder(cl, {
      orderType: "with-items",
      lineItemsAttributes: [{ sku_code: FIRST_SKU, quantity: 1 }],
    })

    const cart = await mountEmbeddedCart({
      page,
      baseURL: baseURL ?? "http://localhost:4000",
      orderId,
      accessToken,
    })
    const lineItems = cart.locator("[data-test-id=line-item-skus]")
    const itemsCount = cart.locator(
      "[data-test-id=cart-title-items-count]:visible",
    )
    await expect(lineItems).toHaveCount(1)
    await expect(itemsCount).toHaveText("1")

    // the outer container adds a product to the same order
    await cl.line_items.create({
      sku_code: SECOND_SKU,
      quantity: 1,
      order: cl.orders.relationship(orderId),
    })
    const expectedSubtotal = await getSubtotalCents(cl, orderId)

    await sendUpdateToCart(page)

    // totals come from the order, so seeing them change proves the reload ran
    await expect(
      cart.locator("[data-test-id=subtotal-amount]"),
    ).toHaveAttribute("data-amount", `${expectedSubtotal}`)
    await expect(lineItems).toHaveCount(2)
    await expect(itemsCount).toHaveText("2")
  })

  test("should drop a line item removed from the outer container", async ({
    page,
    baseURL,
  }) => {
    const { orderId } = await createOrder(cl, {
      orderType: "with-items",
      lineItemsAttributes: [
        { sku_code: FIRST_SKU, quantity: 1 },
        { sku_code: SECOND_SKU, quantity: 1 },
      ],
    })

    const cart = await mountEmbeddedCart({
      page,
      baseURL: baseURL ?? "http://localhost:4000",
      orderId,
      accessToken,
    })
    const lineItems = cart.locator("[data-test-id=line-item-skus]")
    const itemsCount = cart.locator(
      "[data-test-id=cart-title-items-count]:visible",
    )
    await expect(lineItems).toHaveCount(2)
    await expect(itemsCount).toHaveText("2")

    // the outer container removes a product from the same order
    const order = await cl.orders.retrieve(orderId, { include: ["line_items"] })
    const toRemove = order.line_items?.find((li) => li.sku_code === SECOND_SKU)
    if (toRemove == null) throw new Error(`Line item ${SECOND_SKU} not found`)
    await cl.line_items.delete(toRemove.id)
    const expectedSubtotal = await getSubtotalCents(cl, orderId)

    await sendUpdateToCart(page)

    // totals come from the order, so seeing them change proves the reload ran
    await expect(
      cart.locator("[data-test-id=subtotal-amount]"),
    ).toHaveAttribute("data-amount", `${expectedSubtotal}`)
    await expect(lineItems).toHaveCount(1)
    await expect(itemsCount).toHaveText("1")
  })
})
