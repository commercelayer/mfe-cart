import cn from "classnames"
import { FC, ReactNode } from "react"

import { CompanyLogo } from "#components/CompanyLogo"
import { SkeletonItem } from "#components/Skeleton/Item"

type Props = {
  children?: ReactNode
  isLoading?: boolean
}

export const PageHeader: FC<Props> = ({ isLoading, children }) => {
  return (
    <div
      className={cn({
        "animate-pulse": isLoading,
      })}
    >
      <div className="py-8 border-b border-b-gray-200">
        <CompanyLogo />
      </div>
      <div className="flex justify-between items-center py-11 border-b border-b-gray-200">
        {isLoading ? (
          <>
            <SkeletonItem className="w-1/12 h-[36px]" />
            <SkeletonItem className="w-1/12 h-[20px]" />
          </>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
