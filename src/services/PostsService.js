import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {

  async GetPosts(query = '') {
    const res = await api.get('api/blogs/' + query)
    AppState.posts = res.data
  }
  setActive(id) {
    const applesauce = AppState.posts.find(p => p.id == id)
    AppState.activePost = applesauce
    logger.log(id)
  }
}

export const postsService = new PostsService()