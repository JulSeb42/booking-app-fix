/*=============================================== Index ===============================================*/

import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProviderWrapper } from "tsx-library-julseb"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import { AuthProviderWrapper } from "./context/auth"

import reportWebVitals from "./tests/reportWebVitals"

import "tsx-library-julseb/index.css"
import "./styles/index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <BrowserRouter>
        <ThemeProviderWrapper>
            <AuthProviderWrapper>
                <App />
            </AuthProviderWrapper>
        </ThemeProviderWrapper>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
