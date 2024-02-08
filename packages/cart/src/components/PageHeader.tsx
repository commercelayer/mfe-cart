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
      <div className="pt-12 pb-10 flex">
        <CompanyLogo />
      </div>
      <div className="flex flex-col mb-12">
        {isLoading ? (
          <>
            <SkeletonItem className="w-4/12 h-[36px] mb-4" />
            <SkeletonItem className="w-6/12 h-[18px]" />
          </>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
