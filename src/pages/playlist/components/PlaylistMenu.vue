<template>
  <div class="space-x-2">
    <SecundaryButton @click="backToHome">
      Close
    </SecundaryButton>
    <DangerButton @click="deletePlaylist">
      Delete
    </DangerButton>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { PlaylistRecord } from "@/records/playlist.record";
import { playlistRepository } from "@/services/playlist.repository";
import { useRouter } from "vue-router";
import DangerButton from "@/components/DangerButton.vue";
import SecundaryButton from "@/components/SecundaryButton.vue";

const router = useRouter();

const props = defineProps({
  playlist: {
    type: Object as PropType<PlaylistRecord>,
    required: true
  }
});

const backToHome = () => {
  router.replace("/home");
}

const deletePlaylist = () => {
  const isConfirmed = confirm(`Are you sure you want to delete ${ props.playlist.title }?`);
  if (!isConfirmed) return;
  playlistRepository.delete(props.playlist.id);
  router.replace("/home");
}
</script>
