import { NextPage } from "next"

import { PageErrorLayour } from "#components/PageErrorLayout"

const Page404: NextPage = () => {
  return (
    <PageErrorLayour statusCode={404} message="This order is not accessible." />
  )
}

export default Page404
