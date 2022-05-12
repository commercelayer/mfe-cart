import { CommerceLayerStatic } from "@commercelayer/sdk"
import retry from "async-retry"

interface FetchResource<T> {
  object: T | undefined
  success: boolean
}

const DEFAULT_RETRIES = 2

export const retryCall = async <T>(
  f: Promise<T>,
  retries = DEFAULT_RETRIES
): Promise<FetchResource<T> | undefined> => {
  return await retry(
    async (bail, number) => {
      try {
        const object = await f
        return {
          object: object as unknown as T,
          success: true,
        }
      } catch (e: unknown) {
        if (CommerceLayerStatic.isApiError(e) && e.status === 401) {
          console.log("Not authorized")
          bail(e)
          return
        }
        if (number === retries + 1) {
          return {
            object: undefined,
            success: false,
          }
        }
        throw e
      }
    },
    {
      retries,
    }
  )
}
