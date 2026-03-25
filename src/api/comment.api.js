import {getAPI, postAPI} from "@/utils/axios";

const API_PREFIX = '/comment'

class CommentApi {
  info = async (id) => {
    const result = await getAPI({path: `${API_PREFIX}/info/${id}`})

    return result
  }

  add = async (data) => {
    const res = await postAPI({path: `${API_PREFIX}/add`, data})

    return res
  }

  vote = async (data) => {
    const res = await postAPI({path: `${API_PREFIX}/vote`, data})

    return res
  }

  list = async (filter) => {
    const queryString = Object.keys(filter).map(key => key + '=' + filter[key]).join('&')
    const res = await getAPI({path: `${API_PREFIX}/list?${queryString}`})

    return res
  }

  replyList = async (parent_id) => {
    const res = await getAPI({path: `${API_PREFIX}/replyList?parent_id=${parent_id}`})

    return res
  }

  voteList = async (movie_id) => {
    const res = await getAPI({path: `${API_PREFIX}/voteList?movie_id=${movie_id}`})

    return res
  }

  latestComments = async () => {
    const result = await getAPI({path: `${API_PREFIX}/latestComments`})
    return result
  }

  topComments = async () => {
    const result = await getAPI({path: `${API_PREFIX}/topComments`})
    return result
  }

  action = async ({id, action, info}) => {
    const res = await postAPI({path: `${API_PREFIX}/action`, data: {id, action, info}})

    return res
  }
}


export default new CommentApi