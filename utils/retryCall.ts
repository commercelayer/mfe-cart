import { CommerceLayerStatic } from "@commercelayer/sdk"
import retry from "async-retry"

interface FetchResource<T> {
  object: T | undefined
  success: boolean
  bailed?: boolean
}

const retries = 3

export const retryCall = async <T>(
  f: () => Promise<T>
): Promise<FetchResource<T> | undefined> => {
  return await retry(
    async (_, attempt) => {
      try {
        return {
          object: await f(),
          success: true,
        }
      } catch (error: any) {
        // sdk return sa structured object in case of api error
        // we assume we hit a not-retriable error when the error object returned has no keys
        const isNotRetryiable =
          error.status === 401 || !Object.keys(error).length
        if (isNotRetryiable) {
          return {
            object: undefined,
            success: false,
            bailed: true,
          }
        }

        if (attempt === retries + 1) {
          return {
            object: undefined,
            success: false,
          }
        }

        throw error
      }
    },
    {
      retries,
    }
  )
}
