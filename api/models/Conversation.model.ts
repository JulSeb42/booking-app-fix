/*=============================================== Conversation model ===============================================*/

import { Schema, model } from "mongoose"

const conversationSchema = new Schema(
    {
        user1: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        user2: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        messages: [
            {
                sender: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },

                message: {
                    type: String,
                    required: true,
                },

                date: String,
                time: String,
            },
        ],

        readUser1: Boolean,
        readUser2: Boolean,
    },
    { timestamps: true }
)

const Conversation = model("Conversation", conversationSchema)

export default Conversation
