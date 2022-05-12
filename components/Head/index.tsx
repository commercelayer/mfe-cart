import NextHead from "next/head"
import { FC } from "react"

interface Props {
  faviconUrl?: string
}

export const Head: FC<Props> = ({ faviconUrl = "/favicon.png" }) => {
  return (
    <NextHead>
      <title>React Cart</title>
      <meta name="description" content="Hosted Cart" />
      <link rel="icon" href={faviconUrl} />
    </NextHead>
  )
}
