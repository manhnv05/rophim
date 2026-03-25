import {getAPI, postAPI} from "@/utils/axios";

const API_PREFIX = '/notification'

class NotificationApi {
  latest = async () => {
    const res = await getAPI({path: `${API_PREFIX}/latest`});
    return res
  }

  list = async ({limit = 10, after_time, type}) => {
    const res = await getAPI({path: `${API_PREFIX}/list?limit=${limit}&after_time=${after_time}&type=${type}`});
    return res
  }

  seenAll = async () => {
    const res = await postAPI({path: `${API_PREFIX}/seenAll`});
    return res
  }

  seen = async (id) => {
    const res = await postAPI({path: `${API_PREFIX}/seen?id=${id}`});
    return res
  }
}

export default new NotificationApi