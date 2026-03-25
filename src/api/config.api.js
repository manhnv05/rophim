import {getAPI} from "@/utils/axios"

const API_PREFIX = '/config'

class ConfigApi {
    list = async () => {
        const result = await getAPI({path: `${API_PREFIX}/list`});
        return result;
    }
}

export default new ConfigApi