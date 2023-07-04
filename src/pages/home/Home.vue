<template>
  <div class="h-full flex flex-col space-y-8 p-4">
    <div class="text-5xl">
      Simple Stage
    </div>
    <div class="space-x-2">
      <PrimaryButton @click="router.push('/editor')">
        Create a song
      </PrimaryButton>
      <PrimaryButton @click="isPlaylistDialogOpen = true">
        Create a playlist
      </PrimaryButton>
    </div>
    <div class="space-y-12">
      <Search/>
      <Playlists/>
      <Musics/>
    </div>

    <Playlist v-if="isPlaylistDialogOpen" @onClose="isPlaylistDialogOpen = false"/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Musics from "@/pages/home/components/Musics.vue";
import Playlists from "@/pages/home/components/Playlists.vue";
import Search from "@/pages/home/components/Search.vue";
import Playlist from "@/dialogs/playlist/Playlist.vue";
import { ref } from "vue";

const router = useRouter()
const isPlaylistDialogOpen = ref(false)
</script>
