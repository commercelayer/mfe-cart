import { IFrameObject as IframeResizerObject } from "iframe-resizer"

type IframeEvent = "updateCart" | "close" | "blur"
type IframeReceivedEvent = "updateCart"

type IframeMessagePayload = {
  type: IframeEvent
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
  }
}
