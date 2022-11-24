/*=============================================== Consts ===============================================*/

import "dotenv/config"

export const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/booking-app-rest"

export const PORT = process.env.PORT || 5005

export const ORIGIN = process.env.ORIGIN || "http://localhost:3000"

export const TOKEN_SECRET = process.env.TOKEN_SECRET || ""

export const jwtConfig = {
    algorithm: "HS256",
    expiresIn: "10d",
}

export const SALT_ROUNDS = 10
