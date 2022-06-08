import { NextPage } from "next"

import { PageErrorLayout } from "#components/PageErrorLayout"

const Page404: NextPage = () => {
  return (
    <PageErrorLayout statusCode={404} message="This order is not accessible." />
  )
}

export default Page404
