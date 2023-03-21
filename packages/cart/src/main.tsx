import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "#styles/globals.css"
import "#components/i18n"
import App from "./App"

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
