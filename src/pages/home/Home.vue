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
      <Songs/>
    </div>

    <PlaylistForm v-if="isPlaylistDialogOpen" @onClose="isPlaylistDialogOpen = false"/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Playlists from "@/pages/home/components/Playlists.vue";
import Search from "@/pages/home/components/Search.vue";
import { ref } from "vue";
import Songs from "@/pages/home/components/Songs.vue";
import PlaylistForm from "@/dialogs/playlist/PlaylistForm.vue";

const router = useRouter()
const isPlaylistDialogOpen = ref(false)
</script>
