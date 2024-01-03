import { FC, ReactNode } from "react"

import { Footer } from "#components/Footer"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  top?: ReactNode
} & InnerProps

export const PageLayout: FC<Props> = ({ top, main, aside }) => {
  return isEmbedded() ? (
    <Inner main={main} aside={aside} />
  ) : (
    <div className="container max-w-[1248px] mx-auto">
      <div className="px-5 flex flex-col min-h-screen">
        {top && <div>{top}</div>}
        <Inner main={main} aside={aside} />
        <Footer />
      </div>
    </div>
  )
}

type InnerProps = {
  main: ReactNode
  aside: ReactNode
}
const Inner: FC<InnerProps> = ({ main, aside }) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-8 xl:gap-48 pt-8 items-start">
      <main className="w-full md:flex-1">{main}</main>
      <aside className="w-full md:w-5/12 xl:w-4/12">
        <div className="md:bg-gray-50 pb-5 md:py-10 md:px-7 rounded-md w-full">
          {aside}
        </div>
      </aside>
    </div>
  )
}
