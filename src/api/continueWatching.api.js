import {getAPI, postAPI} from "@/utils/axios";

const API_PREFIX = '/continueWatching'

class ContinueWatchingApi {
  info = async (movieId) => {
    const res = await getAPI({path: `${API_PREFIX}/info?movie_id=${movieId}`})

    return res
  }

  save = async (data) => {
    const res = await postAPI({path: `${API_PREFIX}/save`, data})

    return res
  }

  remove = async (data) => {
    const res = await postAPI({path: `${API_PREFIX}/remove`, data})

    return res
  }

  list = async ({page = 1, limit = 20}) => {
    const res = await getAPI({path: `${API_PREFIX}/list?limit=${limit}&page=${page}`})

    return res
  }
}


export default new ContinueWatchingApi