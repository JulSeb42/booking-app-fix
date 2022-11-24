/*=============================================== Cloudinary service ===============================================*/

import http from "./http-common"

const errorHandler = (err: any) => {
    throw err
}

const uploadImage = (file: any) => {
    return http
        .put("/uploader/upload-picture", file)
        .then(res => res.data)
        .catch(errorHandler)
}

const createImage = (newImage: any) => {
    return http
        .post("/uploader/edit-picture", newImage)
        .then(res => res.data)
        .catch(errorHandler)
}

const cloudinaryService = {
    uploadImage,
    createImage,
}

export default cloudinaryService
