/*=============================================== User model ===============================================*/

import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: String,

        role: {
            type: String,
            enum: ["user", "artist"],
        },

        city: String,
        imageUrl: String,

        // Artist items
        genre: String,
        bio: String,
        price: Number,
        available: Array,
        youtube: Array,
        youtubeLink: String,
        facebookLink: String,
        instagramLink: String,
        visible: Boolean,

        // Verification
        verified: Boolean,
        verifyToken: String,
        resetToken: String,

        // Messages
        contacted: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        conversations: [
            {
                type: Schema.Types.ObjectId,
                ref: "Conversation",
            },
        ],
    },
    {
        timestamps: true,
    }
)

const User = model("User", userSchema)

export default User
