/*=============================================== User ===============================================*/

export type UserType = {
    _id: string
    fullName: string
    email: string
    password: string
    role: "user" | "artist"
    city: string
    imageUrl: string

    // Artist items
    genre: string
    bio: string
    price: number
    available: string[]
    youtube: string[]
    youtubeLink: string
    facebookLink: string
    instagramLink: string
    visible: boolean

    // Verification
    verified: boolean
    verifyToken: string
    resetToken: string

    // Messages
    contacted: UserType[]

    // conversations:
}
