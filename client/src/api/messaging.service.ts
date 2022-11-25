/*=============================================== Messaging service ===============================================*/

import http from "./http-common"

class MessagingService {
    allConversations() {
        return http.get("/messaging/conversations")
    }

    conversation(id: string) {
        return http.get(`/messaging/conversation/${id}`)
    }

    userConversations(id: string) {
        return http.get(`/messaging/user-conversations/${id}`)
    }

    newConversation(data: any) {
        return http.post("/messaging/new-conversation", data)
    }

    newMessage(id: string, data: any) {
        return http.put(`/messaging/new-message/${id}`, data)
    }

    readUser1(id: string) {
        return http.put(`/messaging/read-user1/${id}`)
    }

    readUser2(id: string) {
        return http.put(`/messaging/read-user2/${id}`)
    }
}

export default new MessagingService()
