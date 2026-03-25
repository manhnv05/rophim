import {getAPI} from "@/utils/axios";

const API_PREFIX = '/collection'

class CollectionApi {
  info = async (id) => {
    const result = await getAPI({path: `${API_PREFIX}/info/${id}`});
    return result;
  }

  list = async ({page = 1, limit = 3}) => {
    const result = await getAPI({path: `${API_PREFIX}/list?page=${page}&limit=${limit}`});
    return result;
  }

  homepageTopics = async () => {
    const result = await getAPI({path: `${API_PREFIX}/homepageTopics`});
    return result;
  }

  allTopics = async () => {
    const result = await getAPI({path: `${API_PREFIX}/allTopics`});
    return result;
  }

  movies = async (id) => {
    const result = await getAPI({path: `${API_PREFIX}/movies/${id}`});
    return result;
  }

  all = async () => {
    const result = await getAPI({path: `${API_PREFIX}/all`});
    return result;
  }
}

export default new CollectionApi