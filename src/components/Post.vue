<template>
  <div
    class="post col-12"
    v-for="p in post"
    :key="p.id"
    @click="openModal(p.id)"
  >
    <div class="card mt-2">
      <div class="card-title p-2 ms-2">{{ p.title }}</div>
      <div class="card-body">{{ p.body }}</div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { Modal } from "bootstrap";
export default {
  setup() {
    onMounted(async () => {
      try {
        await postsService.GetPosts();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message);
      }
    });
    return {
      post: computed(() => AppState.posts),
      openModal(id) {
        postsService.setActive(id);
        const elemental = document.getElementById("posts-modal");
        logger.log(elemental);
        Modal.getOrCreateInstance(elemental).toggle();
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>