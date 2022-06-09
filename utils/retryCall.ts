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
        if (error.status === 401) {
          console.log("Not authorized")
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
