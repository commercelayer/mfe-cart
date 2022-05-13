import { FC } from "react"

import { PageHead } from "#components/PageHead"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"

export const Skeleton: FC = () => {
  return (
    <PageLayout>
      <PageHead title="Loading..." />
      <PageHeader isLoading />
    </PageLayout>
  )
}
