import type { FC } from "react"

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
      isLoading
      main={<LineItemsSkeleton />}
      aside={
        <div className="hidden md:block animate-pulse h-[400px]">
          <div className="py-1 mb-8">
            <div className="flex justify-between">
              <SkeletonItem className="w-20 h-6" />
              <SkeletonItem className="w-20 h-6" />
            </div>
          </div>
          <div className="border-t border-t-gray-100 border-b border-b-gray-400">
            <div className="text-black mt-1 pt-7 pb-10">
              <SkeletonItem className="h-5 w-20 mb-2" />
              <SkeletonItem className="h-4 w-[150px] mt-[60px] mb-[5px]" />
              <SkeletonItem className="h-[47px] w-full" />
            </div>
          </div>

          <div className="flex justify-between py-8 mt-1">
            <SkeletonItem className="w-20 h-4 mt-2" />
            <SkeletonItem className="w-20 h-7" />
          </div>

          <div className="mt-7">
            <SkeletonItem className="w-2/4 h-4 mb-11" />
            <SkeletonItem className="w-full h-[46px]" />
          </div>
        </div>
      }
    />
  )
}
