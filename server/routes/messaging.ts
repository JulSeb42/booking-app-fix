/*=============================================== Messaging routes ===============================================*/

import { Router } from "express"
import jwt from "jsonwebtoken"

import User from "../models/User.model"
import Conversation from "../models/Conversation.model"

import { jwtConfig, TOKEN_SECRET } from "../utils/consts"

const router = Router()

// All conversations
router.get("/conversations", (req, res, next) => {
    Conversation.find()
        .populate("user1")
        .populate("user2")
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// Conversation
router.get("/conversation/:id", (req, res, next) => {
    Conversation.findById(req.params.id)
        .populate("user1")
        .populate("user2")
        .populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "User",
            },
        })
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// User's conversations
router.get("/user-conversations/:id", (req, res, next) => {
    Conversation.find({
        $or: [{ user1: req.params.id }, { user2: req.params.id }],
    })
        .populate("user1")
        .populate("user2")
        .populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "User",
            },
        })
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// New conversation
router.post("/new-conversation", (req, res, next) => {
    const { user1, user2, message, date, time } = req.body

    if (!message) {
        return res.status(400).json({ message: "Message is required" })
    }

    Conversation.create({
        user1,
        user2,
        messages: { sender: user1, message, date, time },
        date,
        time,
        readUser1: true,
        readUser2: false,
    })
        .then(createdConversation => {
            User.findByIdAndUpdate(
                user1,
                {
                    $push: {
                        conversations: createdConversation,
                        contacted: user2,
                    },
                },
                { new: true }
            ).then(updatedUser => {
                User.findByIdAndUpdate(
                    user2,
                    {
                        $push: {
                            conversations: createdConversation,
                            contacted: user1,
                        },
                    },
                    { new: true }
                ).then(() => {
                    const payload = { user: updatedUser }

                    // @ts-expect-error
                    const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

                    return res.status(201).json({
                        user: updatedUser,
                        authToken,
                        createdConversation,
                    })
                })
            })
        })
        .catch(err => next(err))
})

// New message
router.put("/new-message/:id", (req, res, next) => {
    const { sender, message, date, time, readUser1, readUser2 } = req.body

    Conversation.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                messages: {
                    sender,
                    message,
                    date,
                    time,
                },
            },
            readUser1,
            readUser2,
        },
        { new: true }
    )
        .then(updatedConversation =>
            res.status(200).json({ conversation: updatedConversation })
        )
        .catch(err => next(err))
})

// Set as read
router.put("/read-user1/:id", (req, res, next) => {
    Conversation.findByIdAndUpdate(
        req.params.id,
        { readUser1: true },
        { new: true }
    )
        .then(updatedConversation =>
            res.status(200).json({ conversation: updatedConversation })
        )
        .catch(err => next(err))
})

router.put("/read-user2/:id", (req, res, next) => {
    Conversation.findByIdAndUpdate(
        req.params.id,
        { readUser2: true },
        { new: true }
    )
        .then(updatedConversation =>
            res.status(200).json({ conversation: updatedConversation })
        )
        .catch(err => next(err))
})

export default router
