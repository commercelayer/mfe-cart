import { FC } from "react"

import { SkeletonItem } from "./Item"
import { LineItemsSkeleton } from "./LineItems"

import { PageHead } from "#components/PageHead"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"

export const Skeleton: FC = () => {
  return (
    <PageLayout
      top={
        <>
          <PageHead title="Loading..." />
          <PageHeader isLoading />
        </>
      }
      main={<LineItemsSkeleton />}
      aside={
        <div className="animate-pulse h-[400px]">
          <div className="py-1 mb-8">
            <div className="flex justify-between">
              <SkeletonItem className="w-20 h-6" />
              <SkeletonItem className="w-20 h-6" />
            </div>
          </div>
          <div className="border-t border-t-gray-100 border-b border-b-gray-400">
            <div className="text-black py-7">
              <SkeletonItem className="h-5 w-20 mb-2" />
              <SkeletonItem className="h-11 w-full" />
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
      }
    ></PageLayout>
  )
}
