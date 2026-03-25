import {getAPI, postAPI} from "@/utils/axios";

const API_PREFIX = '/player'

class PlayerApi {
    getLink = async (movie_id) => {
        const {result} = await getAPI({path: `${API_PREFIX}/getLink?movie_id=${movie_id}`});
        return result;
    }
}


export default new PlayerApi