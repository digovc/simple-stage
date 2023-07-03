<template>
  <div class="p-2 border rounded cursor-pointer hover:shadow" @click="render">
    {{ music.title }}
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import type { MusicModel } from "@/models/music.model";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  music: {
    type: Object as PropType<MusicModel>,
    required: true
  }
})

const render = () => {
  router.push(`/render/${ props.music.id }`)
}
</script>
