/*=============================================== Search service ===============================================*/

import http from "./http-common"

class SearchService {
    search(city: string, genre: string) {
        return http.get(`/search/all/${city}/${genre}`)
    }
}

export default new SearchService()
