<template>
  <div>
    <Dialog>
      <form class="space-y-8" @submit.prevent="createPlaylist">
        <div>
          New playlist
        </div>
        <div class="flex flex-col space-y-2">
          <input ref="titleInput" class="border border-gray-300 rounded-md p-2 text-black" placeholder="Playlist name" v-model="title"/>
          <input class="border border-gray-300 rounded-md p-2 text-black" placeholder="Tags" v-model="tags"/>
        </div>
        <div class="flex justify-end space-x-2">
          <PrimaryButton type="submit">
            Create
          </PrimaryButton>
          <SecundaryButton @click="emits('onClose')">
            Cancel
          </SecundaryButton>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import type { PlaylistRecord } from "@/records/playlist.record";
import { playlistRepository } from "@/services/playlist.repository";
import SecundaryButton from "@/components/SecundaryButton.vue";
import { onMounted, ref } from "vue";

const emits = defineEmits({ onClose: () => true })
const title = ref("")
const tags = ref("")
const titleInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  titleInput.value?.focus();
});

const createPlaylist = () => {
  const playlist = {
    id: "",
    title: title.value,
    tags: tags.value.split(",").map((tag) => tag.trim()).filter((tag) => tag),
    musicIds: [],
    selectedMusicIds: [],
  } as PlaylistRecord

  playlistRepository.save(playlist)
  emits("onClose")
  window.location.reload()
}
</script>
