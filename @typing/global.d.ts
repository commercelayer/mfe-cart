import { IFrameObject as IframeResizerObject } from "iframe-resizer"

type IframeEvent = "updateCart" | "close" | "blur"

type IframeMessagePayload = {
  type: IframeEvent
}

type IFrameObject = Omit<IframeResizerObject, "sendMessage"> & {
  sendMessage: (message: IframeMessagePayload, targetOrigin: string) => void
}

export declare global {
  interface Window {
    parentIFrame?: IFrameObject
  }
}
