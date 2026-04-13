import { test } from "../fixtures/tokenizedPage"

test.describe("Cart in Eng", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "en" },
    },
  })

  test("should open a cart with texts in English", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("en")
  })
})

test.describe("Cart in Italian", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "it" },
    },
  })

  test("should open a cart with texts in Italian", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("it")
  })
})

test.describe("Cart in Italian using locale as language code", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "it-IT" },
    },
  })

  test("should open a cart with texts in Italian", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("it")
  })
})

test.describe("Cart in German", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "de" },
    },
  })

  test("should open a cart with texts in German", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("de")
  })
})

test.describe("Cart in Hungarian", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "hu" },
    },
  })

  test("should open a cart with texts in Hungarian", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("hu")
  })
})

test.describe("Cart in Polish", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "pl" },
    },
  })

  test("should open a cart with texts in Polish", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("pl")
  })
})

test.describe("Cart in Portuguese", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "pt" },
    },
  })

  test("should open a cart with texts in Portuguese", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("pt")
  })
})

test.describe("Cart in Dutch", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "nl" },
    },
  })

  test("should open a cart with texts in Dutch", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("nl")
  })
})

test.describe("Cart in Spanish", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "es" },
    },
  })

  test("should open a cart with texts in Spanish", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("es")
  })
})

test.describe("Cart in French", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "fr" },
    },
  })

  test("should open a cart with texts in French", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("fr")
  })
})

test.describe("Cart in Croatian", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "hr" },
    },
  })

  test("should open a cart with texts in Croatian", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("hr")
  })
})

test.describe("Cart in Slovenian", () => {
  test.use({
    options: {
      orderType: "plain",
      attributes: { language_code: "sl" },
    },
  })

  test("should open a cart with texts in Slovenian", async ({ CartPage }) => {
    await CartPage.checkOrderLanguage("sl")
  })
})
