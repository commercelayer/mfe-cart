import cn from "classnames"
import type { FC, ReactNode } from "react"

import { CompanyLogo } from "#components/CompanyLogo"
import { SkeletonItem } from "#components/Skeleton/Item"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  /**
   * Content to be displayed as page header, underneath the company logo.
   */
  children?: ReactNode
  /**
   * When this is `true` a Skeleton UI will be displayed instead of `children`
   */
  isLoading?: boolean
}

export const PageHeader: FC<Props> = ({ isLoading, children }) => {
  if (isEmbedded()) {
    // we don't need page header when app is working in embedded mode
    return null
  }

  return (
    <div
      className={cn({
        "animate-pulse": isLoading,
      })}
      data-test-id="cart-header"
    >
      <div className="pt-12 pb-10 flex">
        <CompanyLogo />
      </div>
      <div className="flex flex-col">
        {isLoading ? (
          <div className="border-b flex justify-between items-center flex-row md:flex-col md:items-start py-4 md:py-0 md:pt-0 md:mb-11 mb-12 border-t md:border-t-0">
            <SkeletonItem className="w-[70px] md:w-[120px] h-[27px] md:mb-1" />
            <SkeletonItem className="w-[70px] md:w-[250px] h-[22px]" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
