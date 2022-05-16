import { FC } from "react"

import { SkeletonItem } from "./Item"

import { PageHead } from "#components/PageHead"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"

export const Skeleton: FC = () => {
  return (
    <PageLayout>
      <PageHead title="Loading..." />
      <PageHeader isLoading />

      <div className="flex flex-col md:flex-row md:gap-8 pt-8 items-start">
        {/* Summary */}
        <div className="w-full md:w-7/12">
          <div className="animate-pulse">
            {["item1", "item2"].map((item) => (
              <div
                key={item}
                className="flex gap-5 pb-8 mb-8 border-b border-b-gray-300"
              >
                <SkeletonItem className="w-1/4 self-start md:self-center h-[150px]" />
                <div className="flex-1 flex flex-col min-h-[150px]">
                  <SkeletonItem className="w-3/4 h-6" />
                  <SkeletonItem className="w-40 h-5 mt-2" />
                  <div className="flex justify-between items-center mt-auto">
                    <SkeletonItem className="w-20 h-10" />
                    <SkeletonItem className="w-20  h-7" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="w-full md:w-5/12">
          <div className="bg-gray-50 pb-8 md:py-10 md:px-7 rounded-md w-full h-[400px]">
            <div className="animate-pulse">
              <div className="py-1 mb-8">
                <SkeletonItem className="h-5 w-20" />
              </div>
              <div className="border-t border-t-gray-100 border-b border-b-gray-400">
                <div className="text-black py-8 flex justify-between">
                  <SkeletonItem className="w-20 h-6" />
                  <SkeletonItem className="w-20 h-6" />
                </div>
              </div>

              <div className="text-black py-8 flex justify-between">
                <SkeletonItem className="w-20 h-6" />
                <SkeletonItem className="w-20 h-6" />
              </div>

              <div className="pt-10">
                <SkeletonItem className="w-full h-11" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
