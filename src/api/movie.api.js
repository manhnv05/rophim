import {getAPI, postAPI} from "@/utils/axios";
import {unstable_cache} from "next/cache";

const API_PREFIX = '/movie'

class MovieApi {
    detail = unstable_cache(async (id) => {
        const {result} = await getAPI({path: `${API_PREFIX}/detail/${id}`});
        return result;
    }, [], {revalidate: 10})

    hot = async () => {
        const {result} = await getAPI({path: `${API_PREFIX}/hot`});
        return result;
    }

    casts = async (id) => {
        const {result} = await getAPI({path: `${API_PREFIX}/casts/${id}`});
        return result;
    }

    gallery = async (id) => {
        const {result} = await getAPI({path: `${API_PREFIX}/gallery/${id}`});
        return result;
    }

    ost = async (id) => {
        const {result} = await getAPI({path: `${API_PREFIX}/ost/${id}`});
        return result;
    }

    filter = async (filter) => {
        const queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&')
        const {result} = await getAPI({path: `${API_PREFIX}/filterV2?${queryString}`});
        return result;
    }

    seasons = async (mId) => {
        const {result} = await getAPI({path: `${API_PREFIX}/seasons?mId=${mId}`});
        return result;
    }

    episodes = async ({sId, type}) => {
        const {result} = await getAPI({path: `${API_PREFIX}/season/episodes?sId=${sId}&type=${type}`});
        return result;
    }

    logView = async (id) => {
        const result = await postAPI({path: `${API_PREFIX}/logView/${id}`});
        return result;
    }

    suggestion = async (id) => {
        const {result} = await getAPI({path: `${API_PREFIX}/suggestion/${id}`});
        return result;
    }

    topViews = async (range = "today") => {
        const {result} = await getAPI({path: `${API_PREFIX}/topViews?range=${range}`});
        return result;
    }

    mostCommentedRanking = async () => {
        const {result} = await getAPI({path: `${API_PREFIX}/mostCommentedRanking`});
        return result;
    }

    mostFavoriteRanking = async () => {
        const {result} = await getAPI({path: `${API_PREFIX}/mostFavoriteRanking`});
        return result;
    }

    scheduledEpisodes = async (date) => {
        const {result} = await getAPI({path: `${API_PREFIX}/scheduledEpisodes?date=${date}`});
        return result;
    }

    seoData = async () => {
        const {result} = await getAPI({path: `${API_PREFIX}/seoData`});
        return result;
    }
}

export default new MovieApi