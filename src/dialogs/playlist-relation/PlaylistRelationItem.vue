<template>
  <div class="flex place-items-center cursor-pointer select-none" @click="isLinked = !isLinked">
    <input type="checkbox" v-model="isLinked" class="form-checkbox h-5 w-5 text-gray-600"/>
    <div class="ml-2 text-gray-700 mt-0.5">
      {{ props.playlist.title }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PlaylistRecord } from "@/records/playlist.record";
import type { PropType } from "vue";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { playlistRepository } from "@/services/playlist.repository";

const router = useRouter()
const isLinked = ref<boolean>(false)

const props = defineProps({
  playlist: {
    type: Object as PropType<PlaylistRecord>,
    required: true
  }
})

const refreshRelation = () => {
  const musicId = router.currentRoute.value.params.id?.toString()

  if (isLinked.value) {
    props.playlist?.musicIds?.push(musicId)
  } else {
    props.playlist?.musicIds?.splice(props.playlist?.musicIds?.indexOf(musicId), 1)
  }

  playlistRepository.save(props.playlist)
}

const loadRelation = () => {
  const musicId = router.currentRoute.value.params.id?.toString()
  isLinked.value = props.playlist?.musicIds?.includes(musicId)
}

watch(isLinked, () => {
  refreshRelation()
})

onMounted(() => {
  loadRelation()
})
</script>
