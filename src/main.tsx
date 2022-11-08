import { render } from "react-dom"

import "#styles/globals.css"
import "#components/i18n"
import App from "./App"

const rootNode = document.getElementById("root")
render(<App />, rootNode)
