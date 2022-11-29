import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"

import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"

import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <EmbeddedCapabilities.IframeResizerInit />
      <Router base={import.meta.env.PUBLIC_BASE_PATH}>
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
    </HelmetProvider>
  )
}

export default App
