<template>
  <div>
    <Dialog v-if="isVisible" @onClose="isVisible = false">
      <div class="space-y-8 w-60">
        <div>
          Playlist relations
        </div>
        <div>
          <PlaylistRelationItem v-for="playlist in playlists" :playlist="playlist" :key="playlist.id"/>
        </div>
        <div class="flex justify-end">
          <SecundaryButton @click="isVisible = false">
            Close
          </SecundaryButton>
        </div>
      </div>
    </Dialog>
  </div>

</template>
<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { onMounted, ref } from "vue";
import type { PlaylistRecord } from "@/records/playlist.record";
import { playlistRepository } from "@/services/playlist.repository";
import PlaylistRelationItem from "@/dialogs/playlist-relation/PlaylistRelationItem.vue";
import SecundaryButton from "@/components/SecundaryButton.vue";

const isVisible = ref<boolean>(false);
const playlists = ref<PlaylistRecord[]>([]);

const show = () => {
  isVisible.value = true;
};

const loadPlaylists = async () => {
  playlists.value = playlistRepository.getAll();
};

defineExpose({
  show
})

onMounted(() => {
  loadPlaylists()
})
</script>
