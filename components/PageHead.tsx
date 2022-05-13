import NextHead from "next/head"
import { FC } from "react"

import { defaultSettings } from "#utils/getSettings"

interface Props {
  title?: string
  description?: string
  faviconUrl?: string
}

export const PageHead: FC<Props> = ({
  faviconUrl,
  title = "Your Cart",
  description = "Hosted Cart by Commerce Layer",
}) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={faviconUrl || defaultSettings.favicon} />
    </NextHead>
  )
}
