import type { FC } from "react"
import { useSettings } from "#components/SettingsProvider"
import { SkeletonItem } from "./Item"

export const LineItemsSkeleton: FC = () => {
  const { settings } = useSettings()
  return (
    <div className="animate-pulse">
      <div className="flex gap-5 pb-8 mb-8 border-b border-dashed border-b-gray-300">
        {/* image */}
        <SkeletonItem className="w-[58px] h-[58px]" />
        <div className="flex-1 flex flex-col">
          {/* sku code */}
          {settings.isValid && settings.hideItemCodes ? null : (
            <SkeletonItem className="w-24 h-3 mb-1" />
          )}
          <div className="flex gap-1 justify-between mb-1">
            {/* name */}
            <SkeletonItem className="w-full md:w-2/3 h-7 mb-1" />
            {/* price */}
            <SkeletonItem className="hidden md:block w-16 h-8" />
          </div>
          <div className="flex justify-between items-start">
            {/* unit price */}
            <SkeletonItem className="w-[110px] h-4" />
          </div>
          {/* quantity selector */}
          <SkeletonItem className="w-[140px] h-11 mt-9" />
        </div>
      </div>
    </div>
  )
}
