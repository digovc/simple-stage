<template>
  <div class="h-full flex flex-col space-y-8 p-4 overflow-y-auto">
    <div class="flex space-x-2">
      <div :style="`background-image: url(${logoUrl})`" class="w-12 h-12 bg-center bg-no-repeat"/>
      <div class="text-5xl">
        Simple Stage
      </div>
    </div>
    <div>
      <HomeMenu/>
    </div>
    <div class="space-y-12 pb-24 flex flex-col items-center">
      <HomeSearch @onSearch="search"/>
      <Playlists ref="playlistsRef"/>
      <Musics ref="musicsRef"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Playlists from "@/pages/home/components/Playlists.vue";
import HomeMenu from "@/pages/home/components/HomeMenu.vue";
import Musics from "@/pages/home/components/Musics.vue";
import { ref } from "vue";
import HomeSearch from "@/pages/home/components/HomeSearch.vue";
import logoUrl from "@/assets/logo-green.svg";

const playlistsRef = ref();
const musicsRef = ref();

const search = (value: string) => {
  playlistsRef.value?.filterPlaylists(value);
  musicsRef.value?.filterMusics(value);
};
</script>
