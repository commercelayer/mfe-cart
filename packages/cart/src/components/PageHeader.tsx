import cn from "classnames"
import { FC, ReactNode } from "react"

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
      <div className="py-12 border-b border-b-gray-200">
        <CompanyLogo />
      </div>
      <div className="flex justify-between items-center py-12 border-b border-b-gray-200 mb-16">
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
