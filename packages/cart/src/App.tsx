import { Router, Route, Switch } from "wouter"

import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"

import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"

const App = () => {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <>
      <EmbeddedCapabilities.IframeResizerInit />
      <Router base={basePath}>
        <Switch>
          <Route path={"/404"}>
            <ErrorPage />
          </Route>
          <Route path={"/:orderId"}>
            <CartPage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
