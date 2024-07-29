import type { Order } from "@commercelayer/sdk"
import { IFrameObject as IframeResizerObject } from "iframe-resizer"

type IframeEvent = "update" | "close" | "blur"
type IframeReceivedEvent = "update"

type IframeMessagePayload =
  | {
      type: "update"
      payload?: Order
    }
  | {
      type: "close"
    }
  | {
      type: "blur"
    }

type IFrameObject = Omit<IframeResizerObject, "sendMessage"> & {
  sendMessage: (message: IframeMessagePayload, targetOrigin: string) => void
}

export declare global {
  declare module "*.module.css"

  interface Window {
    parentIFrame?: IFrameObject
    iFrameResizer?: {
      onMessage?: (message: { type?: IframeReceivedEvent }) => void
    }
    reloadOrderCallback?: () => void
    /**
     * Commerce Layer app configuration available from global window object
     */
    clAppConfig: CommerceLayerAppConfig
  }

  interface CommerceLayerAppConfig {
    /**
     * Specific domain to use for Commerce Layer API requests.
     * It must be set as `commercelayer.io`.
     */
    domain: string
    /**
     * The organization slug that generates the accessToken.
     * When null it means the app is hosted by Commerce Layer.
     */
    selfHostedSlug?: string | null
  }
}
