import {getAPI, postAPI} from "@/utils/axios";

const API_PREFIX = '/favoriteCast'

class FavoriteCastApi {
  info = async (castId) => {
    const res = await getAPI({path: `${API_PREFIX}/info?cast_id=${castId}`})

    return res
  }

  add = async (data) => {
    const res = await postAPI({path: `${API_PREFIX}/add`, data})

    return res
  }

  remove = async (data) => {
    const res = await postAPI({path: `${API_PREFIX}/remove`, data})

    return res
  }

  list = async ({page = 1}) => {
    const res = await getAPI({path: `${API_PREFIX}/list?limit=18&page=${page}`})

    return res
  }
}


export default new FavoriteCastApi