import { LogoCL } from "@commercelayer/react-utils"
import { FC } from "react"

import { Footer } from "#components/Footer"
import { PageHead } from "#components/PageHead"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  /**
   * Page title, if `undefined` default app title will be used.
   */
  title?: string
  /**
   * Short identifier to be shown as error code. This is meant to be for displaying only, it does not affect HTTP response status.
   */
  statusCode: string | number
  /**
   * A brief description of the encountered error.
   */
  message: string
}

export const PageErrorLayout: FC<Props> = ({ statusCode, message, title }) => {
  return (
    <>
      <PageHead title={title} />
      <div className="container">
        <div className="p-5 pb-0 md:p-10 md:pb-0 lg:px-24 h-screen">
          <div className="relative flex flex-wrap items-center justify-center flex-col h-full">
            {!isEmbedded() ? (
              <div className="absolute top-0 left-0">
                <LogoCL className="text-black max-w-xs h-auto w-full" />
              </div>
            ) : null}
            <div className="py-20 flex flex-1 flex-col justify-center">
              <div className="flex items-center pb-20">
                <div className="p-4 text-xl font-bold border-gray-300 text-gray-800 border-b md:border-r md:border-b-0">
                  {statusCode}
                </div>
                <div className="p-4 text-sm text-gray-500 leading-none">
                  {message}
                </div>
              </div>
            </div>
            {!isEmbedded() ? <Footer /> : null}
          </div>
        </div>
      </div>
    </>
  )
}
