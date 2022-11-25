/*=============================================== User service ===============================================*/

import http from "./http-common"

class UserService {
    allUsers() {
        return http.get("/users/all-users")
    }

    allArtists() {
        return http.get("/users/all-artists")
    }

    getUser(id: string) {
        return http.get(`/users/user/${id}`)
    }

    editAccount(id: string, data: any) {
        return http.put(`/users/edit-account/${id}`, data)
    }

    editPassword(id: string, data: any) {
        return http.put(`/users/edit-password/${id}`, data)
    }

    deleteAccount(id: string) {
        return http.delete(`/users/delete-account/${id}`)
    }
}

export default new UserService()
