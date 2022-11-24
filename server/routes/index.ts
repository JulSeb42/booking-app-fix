/*=============================================== All routes ===============================================*/

import { Router } from "express"

import auth from "./auth"
import users from "./users"
import uploader from "./uploader"
import search from "./search"

const router = Router()

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

router.use("/auth", auth)
router.use("/users", users)
router.use("/uploader", uploader)
router.use("/search", search)

export default router
