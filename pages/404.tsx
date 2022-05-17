import { LogoCL } from "@commercelayer/react-utils"
import { NextPage } from "next"

import { Footer } from "#components/Footer"
import { PageHead } from "#components/PageHead"

const Page404: NextPage = () => {
  return (
    <>
      <PageHead />
      <div className="container">
        <div className="p-5 pb-0 md:p-10 md:pb-0 lg:px-24 h-screen">
          <div className="relative flex flex-wrap items-center justify-center flex-col h-full">
            <div className="absolute top-0 left-0">
              <LogoCL className="text-black max-w-xs h-auto w-full" />
            </div>
            <div className="py-20 flex flex-1 flex-col justify-center">
              <div className="flex items-center pb-20">
                <div className="p-4 text-xl font-bold border-gray-300 text-gray-800 border-b md:border-r md:border-b-0">
                  404
                </div>
                <div className="p-4 text-sm text-gray-500 leading-none">
                  This order is not accessible.
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page404
