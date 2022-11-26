/*=============================================== Search routes ===============================================*/

import { Router } from "express"

import User from "../models/User.model"

const router = Router()

// Search
router.get("/all/:city/:genre", (req, res, next) => {
    const city = req.params.city
    const genre = req.params.genre

    User.find({
        city: { $regex: city, $options: "-i" },
        genre: { $regex: genre, $options: "-i" },
        visible: true,
    })
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

export default router
