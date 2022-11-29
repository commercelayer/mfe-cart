import { Helmet, HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"

import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"

import { isEmbedded } from "#utils/isEmbedded"

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Helmet>
        {isEmbedded() && (
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.js"
            data-test-id="iframe-resizer-script"
            type="text/javascript"
          />
        )}
      </Helmet>
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
