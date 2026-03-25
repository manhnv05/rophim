import {getAPI, postAPI} from "@/utils/axios";

const API_PREFIX = '/favoriteDirector'

class FavoriteDirectorApi {
  info = async (directorId) => {
    const res = await getAPI({path: `${API_PREFIX}/info?director_id=${directorId}`})

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


export default new FavoriteDirectorApi