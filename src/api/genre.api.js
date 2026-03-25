import {getAPI} from "@/utils/axios";
import {unstable_cache} from "next/cache";

const API_PREFIX = '/genre'

class GenreApi {
  detail = unstable_cache(async (id) => {
    const result = await getAPI({path: `${API_PREFIX}/detail/${id}`});
    return result;
  }, [], {revalidate: 10})

  movies = async (id) => {
    const result = await getAPI({path: `${API_PREFIX}/movies?id=${id}`});
    return result;
  }

  list = async ()=>{
    const result = await getAPI({path: `${API_PREFIX}/list`});
    return result;
  }

  mostPopularRanking = async ()=>{
    const {result} = await getAPI({path: `${API_PREFIX}/mostPopularRanking`});
    return result;
  }
}

export default new GenreApi