import { FC } from "react"

import { SkeletonItem } from "./Item"

export const LineItemsSkeleton: FC = () => {
  return (
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
              <SkeletonItem className="w-24 h-10" />
              <SkeletonItem className="w-20  h-7" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
