import { IFrameObject as IframeResizerObject } from "iframe-resizer"

type IframeMessagePayload = {
  type: "updateCart"
}

type IFrameObject = Omit<IframeResizerObject, "sendMessage"> & {
  sendMessage: (message: IframeMessagePayload, targetOrigin: string) => void
}

export declare global {
  interface Window {
    parentIFrame?: IFrameObject
  }
}
