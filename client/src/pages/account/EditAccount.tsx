/*=============================================== EditAccount ===============================================*/

import React, { useContext, useState } from "react"
import { Text, Form, Input, Alert, InputImage } from "tsx-library-julseb"
import { useNavigate, Link } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"
import userService from "../../api/user.service"
import cloudinaryService from "../../api/cloudinary.service"

import Page from "../../components/layouts/Page"
import DangerZone from "../../components/DangerZone"

import { EditType } from "../../types"

const EditAccount = ({ edited, setEdited }: EditType) => {
    const navigate = useNavigate()

    const { user, setUser, setToken, logoutUser } = useContext(
        AuthContext
    ) as AuthContextType

    const [inputs, setInputs] = useState({
        fullName: user.fullName,
        imageUrl: user.imageUrl,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({ ...inputs, [e.target.id]: e.target.value })

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const uploadData = new FormData()
        setIsLoading(true)

        // @ts-expect-error
        uploadData.append("imageUrl", e.target.files[0])

        cloudinaryService
            .uploadImage(uploadData)
            .then(res => {
                setInputs({
                    ...inputs,
                    imageUrl: res.secure_url,
                })
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        // @ts-expect-error
        if (e.target.files[0]) {
            setInputs({
                ...inputs,
                // @ts-expect-error
                imageUrl: e.target.files[0],
            })
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setInputs({
                    ...inputs,
                    imageUrl: reader.result,
                })
            })
            // @ts-expect-error
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        userService
            .editAccount(user._id, inputs)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate(-1)
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        userService
            .deleteAccount(user._id)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Edit your account" mainWidth="form" >
            <Text tag="h1">Edit your account</Text>

            <Form
                onSubmit={handleSubmit}
                buttonPrimary={{ text: "Save changes" }}
                buttonSecondary={{ text: "Cancel", to: "/my-account" }}
                isLoading={isLoading}
            >
                <Input
                    id="fullName"
                    value={inputs.fullName}
                    onChange={handleInputs}
                    label="Full name"
                    autoFocus
                />

                <Input
                    id="email"
                    value={user.email}
                    label="Email"
                    helperBottom="You can not edit your email."
                    disabled
                />

                <InputImage
                    id="imageUrl"
                    onChange={(e: any) => handleImage(e)}
                    img={{ src: inputs.imageUrl }}
                    label="Profile picture"
                    icons={{ empty: "user" }}
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

            <Text>
                <Link to="/my-account/edit-password">Edit your password.</Link>
            </Text>

            <DangerZone
                texts={{
                    body: "Are you sure you want to delete your account?",
                    buttonOpen: "Delete your account",
                }}
                buttonPrimary={{
                    text: "Yes, delete my account",
                    onClick: handleDelete,
                }}
            />
        </Page>
    )
}

export default EditAccount
