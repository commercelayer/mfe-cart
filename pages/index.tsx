import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>React Cart</title>
        <meta name="description" content="Commerce Layer React Cart" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <h1 data-test-id="title" className="text-3xl font-medium">
          Commerce Layer React Cart
        </h1>
      </main>
    </div>
  )
}

export default Home
