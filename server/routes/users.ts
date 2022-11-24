/*=============================================== Users routes ===============================================*/

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { passwordRegex } from "ts-utils-julseb"

import User from "../models/User.model"

import { SALT_ROUNDS, TOKEN_SECRET, jwtConfig } from "../utils/consts"

const router = Router()

// Get all users
router.get("/all-users", (req, res, next) => {
    User.find()
        .then(usersFromDb => res.status(200).json(usersFromDb))
        .catch(err => next(err))
})

// Get all artists
router.get("/all-artists", (req, res, next) => {
    User.find({ role: "artist", visible: true })
        .then(usersFromDb => res.status(200).json(usersFromDb))
        .catch(err => next(err))
})

// Get user by ID
router.get("/user/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(userFromDb => res.status(200).json(userFromDb))
        .catch(err => next(err))
})

// Edit user
router.put("/edit-account/:id", (req, res, next) => {
    const {
        fullName,
        city,
        imageUrl,
        genre,
        bio,
        price,
        available,
        youtube,
        youtubeLink,
        facebookLink,
        instagramLink,
        visible,
    } = req.body

    if (!fullName) {
        return res
            .status(400)
            .json({ message: "Your full name can not be empty." })
    }

    if (!city) {
        return res.status(400).json({ message: "Please provide your city." })
    }

    User.findByIdAndUpdate(
        req.params.id,
        {
            fullName,
            city,
            imageUrl,
            genre,
            bio,
            price,
            available,
            youtube,
            youtubeLink,
            facebookLink,
            instagramLink,
            visible,
        },
        { new: true }
    )
        .then(updatedUser => {
            const payload = { user: updatedUser }

            // @ts-expect-error
            const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

            res.status(201).json({
                user: updatedUser,
                authToken: authToken,
            })
        })
        .catch(err => next(err))
})

// Edit password
router.put("/edit-password/:id", (req, res, next) => {
    const { password } = req.body

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    const hashedPassword = bcrypt.hashSync(password, salt)

    User.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        { new: true }
    )
        .then(updatedUser => {
            const payload = { user: updatedUser }

            // @ts-expect-error
            const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

            res.status(201).json({
                user: updatedUser,
                authToken: authToken,
            })
        })
        .catch(err => next(err))
})

// Delete user
router.delete("/delete-account/:id", (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "User deleted" })
        })
        .catch(err => next(err))
})

export default router
