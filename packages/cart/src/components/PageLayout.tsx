import { FC, ReactNode } from "react"

import { Footer } from "#components/Footer"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  main: ReactNode
  aside: ReactNode
  top?: ReactNode
}

export const PageLayout: FC<Props> = ({ top, main, aside }) => {
  return isEmbedded() ? (
    <Inner main={main} aside={aside} />
  ) : (
    <div className="container 2xl:max-w-screen-2xl 2xl:mx-auto h-full">
      <Inner top={top} main={main} aside={aside} />
    </div>
  )
}

const Inner: FC<Props> = ({ top, main, aside }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <main className="w-full md:flex-1 px-5 lg:px-24">
        {top && <div>{top}</div>}
        {main}
        <Footer className="hidden" />
      </main>
      <aside className="w-full md:flex-1 px-5 lg:px-24 md:bg-gray-50">
        <div className="bg-gray-50 px-5 py-6 md:px-0 md:pb-0 md:pt-12 rounded-lg md:rounded-none">
          {aside}
        </div>
        <Footer className="mt-6 py-6 md:my-0 md:hidden" />
      </aside>
    </div>
  )
}
