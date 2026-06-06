<template>
  <div class="h-full flex flex-col space-y-8 p-4 overflow-y-auto">
    <div class="flex items-center justify-center gap-3">
      <div :style="`background-image: url(${logoUrl})`" class="w-14 h-14 bg-center bg-no-repeat shrink-0"/>
      <div class="flex flex-col leading-none">
        <span class="text-2xl font-light tracking-wide text-white/70">Simple</span>
        <span class="text-4xl font-bold tracking-tight" style="color: #3DD980;">Stage</span>
      </div>
    </div>
    <div>
      <HomeMenu/>
    </div>
    <div class="space-y-12 pb-24 flex flex-col items-center">
      <HomeSearch @onSearch="search"/>
      <div class="w-full flex flex-col items-center gap-12">
        <Playlists v-show="!searching" ref="playlistsRef"/>
        <Musics ref="musicsRef" :forceOpen="searching"/>
        <div v-if="searching && !hasResults" class="text-white/30 text-sm py-8">
          Nothing found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Playlists from "@/pages/home/components/Playlists.vue";
import HomeMenu from "@/pages/home/components/HomeMenu.vue";
import Musics from "@/pages/home/components/Musics.vue";
import { ref, computed, nextTick } from "vue";
import HomeSearch from "@/pages/home/components/HomeSearch.vue";
import logoUrl from "@/assets/logo-green.svg";

const playlistsRef = ref();
const musicsRef = ref();
const searching = ref(false);

const hasPlaylistResults = computed(() => playlistsRef.value?.hasVisibleItems?.value ?? true);
const hasMusicResults = computed(() => musicsRef.value?.hasVisibleItems?.value ?? true);
const hasResults = computed(() => hasPlaylistResults.value || hasMusicResults.value);

const search = async (value: string) => {
  searching.value = !!value;
  await nextTick();
  playlistsRef.value?.filterPlaylists(value);
  musicsRef.value?.filterMusics(value);
};
</script>
