/*=============================================== App ===============================================*/

import "dotenv/config"
import express from "express"

import config from "./config"
import allRoutes from "./routes"
import errorHandler from "./error-handling"

import "./db"

const app = express()
config(app)
app.use("/api", allRoutes)
errorHandler(app)

export default app
