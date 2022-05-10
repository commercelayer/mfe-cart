import type { NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"
import tw from "twin.macro"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>React Cart</title>
        <meta name="description" content="Commerce Layer React Cart" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Title data-test-id="title">Commerce Layer React Cart</Title>
      </main>
    </div>
  )
}

export default Home

const Title = styled.h1`
  ${tw`text-3xl font-medium`}
`
