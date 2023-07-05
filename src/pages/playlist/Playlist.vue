<template>
  <div class="space-y-4 p-4">
    <div class="text-2xl">
      {{ playlist?.title }}
    </div>
    <div>
      <PlaylistMenu v-if="playlist" :playlist="playlist"/>
    </div>
    <div class="text-lg">
      Songs
    </div>
    <div>
      <ul class="space-y-2">
        <li v-for="music in musics" :key="music.id"
            class="bg-gray-100 p-2 rounded cursor-pointer flex hover:shadow"
            @click="renderMusic(music)">
          <div class="flex justify-between grow">
            <div class="text-lg">
              {{ music.title }}
            </div>
            <div class="text-sm pt-1 text-gray-600">
              {{ music.artist }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PlaylistRecord } from "@/records/playlist.record";
import { onMounted, ref } from "vue";
import { playlistRepository } from "@/services/playlist.repository";
import { useRouter } from "vue-router";
import type { MusicRecord } from "@/records/music.record";
import { musicRepository } from "@/services/music.repository";
import PlaylistMenu from "@/pages/playlist/components/PlaylistMenu.vue";

const playlist = ref<PlaylistRecord | null>(null);
const router = useRouter();
const musics = ref<MusicRecord[]>([]);

const loadMusics = () => {
  if (playlist.value === null) return;
  if (!playlist.value.musicIds || playlist.value.musicIds.length === 0) return;
  musics.value = [];

  for (const musicId of playlist.value.musicIds) {
    if (!musicId) continue;
    const music = musicRepository.getById(musicId);
    if (music) musics.value.push(music);
  }
};

const loadPlaylist = () => {
  const playlistId = router.currentRoute.value.params.id?.toString() ?? "";
  playlist.value = playlistRepository.getById(playlistId)
};

const renderMusic = (music: MusicRecord) => {
  const path = `/render/${ music.id }`;
  router.push({ path: path, query: { playlistId: playlist.value?.id } });
}

onMounted(() => {
  loadPlaylist();
  loadMusics();
})
</script>
