import {getAPI} from "@/utils/axios";
import {unstable_cache} from "next/cache";

const API_PREFIX = '/cast'

class CastApi {
  detail = unstable_cache(async (id) => {
    const {result} = await getAPI({path: `${API_PREFIX}/detail/${id}`});
    return result;
  }, [], {revalidate: 10})

  popular = async ()=>{
    const result = await getAPI({path: `${API_PREFIX}/popular`});
    return result;
  }

  favorite = async ()=>{

  }

  list = async (filter) => {
    const queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&')
    const {result} = await getAPI({path: `${API_PREFIX}/list?${queryString}`});
    return result;
  }
}

export default new CastApi