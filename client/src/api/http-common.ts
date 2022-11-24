/*=============================================== Http common ===============================================*/

/*
    Create API link
*/

import axios from "axios"

const http = axios.create({
    baseURL: "/api",
})

export default http
