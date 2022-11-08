import { Router, Route, Switch } from "wouter"

import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"

function App(): JSX.Element {
  return (
    <Router base={import.meta.env.PUBLIC_BASE_PATH}>
      <Switch>
        <Route path={"/:orderId"}>
          <CartPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
