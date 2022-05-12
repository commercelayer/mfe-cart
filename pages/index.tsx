import type { NextPage } from "next"

const Home: NextPage = () => {
  return <div>This page does not exist</div>
}

export default Home

export const getStaticProps = () => {
  return {
    notFound: true,
  }
}
