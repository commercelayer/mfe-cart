import { FC } from "react"

import { PageErrorLayout } from "#components/PageErrorLayout"

const ErrorPage: FC = () => {
  return (
    <PageErrorLayout statusCode={404} message="This order is not accessible." />
  )
}

export default ErrorPage
