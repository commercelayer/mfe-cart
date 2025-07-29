import cn from "classnames"
import type { FC, ReactNode } from "react"

import { Footer } from "#components/Footer"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  main: ReactNode
  aside: ReactNode
  top?: ReactNode
  isLoading?: boolean
}

export const PageLayout: FC<Props> = ({
  top,
  main,
  aside,
  isLoading = false,
}) => {
  return isEmbedded() ? (
    <Inner main={main} aside={aside} isLoading={isLoading} />
  ) : (
    <div className="container 2xl:max-w-(--breakpoint-2xl) 2xl:mx-auto h-full">
      <Inner top={top} main={main} aside={aside} isLoading={isLoading} />
    </div>
  )
}

const Inner: FC<Props> = ({ top, main, aside, isLoading }) => {
  const showFooter = !isEmbedded() && !isLoading
  return (
    <div
      className={cn("flex flex-col md:flex-row md:bg-gray-50", {
        "min-h-screen": !isEmbedded(),
      })}
    >
      <main
        className={cn("w-full md:flex-1", {
          "md:pt-12 md:px-8": isEmbedded(),
          "px-5 lg:px-24": !isEmbedded(),
        })}
      >
        {top && <div>{top}</div>}
        {main}
        {showFooter && <Footer className="hidden" />}
      </main>
      <aside
        className={cn("w-full md:flex-1 bg-white", {
          "md:px-8": isEmbedded(),
          "md:px-5 lg:px-24": !isEmbedded(),
        })}
      >
        <div className="bg-gray-50 md:bg-white px-5 py-6 md:px-0 md:pb-0 md:pt-12">
          {aside}
        </div>
        {showFooter && <Footer className="py-2 md:py-6 md:my-0 md:hidden" />}
      </aside>
    </div>
  )
}
