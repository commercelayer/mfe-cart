import { FC, ReactNode } from "react"

import { Footer } from "#components/Footer"
import { isEmbedded } from "#utils/isEmbedded"

type Props = InnerProps

export const PageLayout: FC<Props> = ({ top, main, aside }) => {
  return isEmbedded() ? (
    <Inner main={main} aside={aside} />
  ) : (
    <div className="container 2xl:max-w-screen-2xl 2xl:mx-auto h-full">
      <Inner top={top} main={main} aside={aside} />
    </div>
  )
}

type InnerProps = {
  main: ReactNode
  aside: ReactNode
  top?: ReactNode
}
const Inner: FC<InnerProps> = ({ top, main, aside }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <main className="w-full md:flex-1 px-24">
        {top && <div>{top}</div>}
        {main}
        <Footer />
      </main>
      <aside className="w-full md:flex-1 px-24 md:bg-gray-50">
        <div className="pt-12">{aside}</div>
      </aside>
    </div>
  )
}
