/*=============================================== Uploader ===============================================*/

import { Router } from "express"
import fileUploader from "../config/cloudinary.config"

const router = Router()

router.put(
    "/upload-picture",
    fileUploader.single("imageUrl"),
    (req, res, next) => {
        if (!req.file) {
            next(new Error("No file uploaded"))
            return
        }

        res.json({ secure_url: req.file.path })
    }
)

export default router
