<template>
  <div class="space-y-4 p-4">
    <div class="text-2xl">
      {{ playlist?.title }}
    </div>
    <div>
      <PlaylistMenu v-if="playlist" :playlist="playlist" @onMusicsChanged="refreshPlaylist"/>
    </div>
    <div class="text-lg">
      Songs
    </div>
    <div>
      <draggable class="space-y-2" :list="musics" @change="saveNewOrder">
        <div v-for="music in musics" :key="music.id" class="border p-1 px-2 rounded cursor-pointer flex hover:shadow"
             @click="renderMusic(music)">
          <div class="flex justify-between grow">
            <div class="text-lg">
              {{ music.title }}
            </div>
            <div class="text-sm pt-1 text-gray-600">
              {{ music.artist }}
            </div>
          </div>
        </div>
      </draggable>
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
import { VueDraggableNext as draggable } from 'vue-draggable-next'

const playlist = ref<PlaylistRecord | null>(null);
const router = useRouter();
const musics = ref<MusicRecord[]>([]);

const loadMusics = () => {
  musics.value = [];

  if (playlist.value === null) return;
  if (!playlist.value.musicIds || playlist.value.musicIds.length === 0) return;

  for (const musicId of playlist.value.musicIds) {
    if (!musicId) continue;
    const music = musicRepository.getById(musicId);
    if (music) musics.value.push(music);
  }
};

const loadPlaylist = () => {
  const playlistId = router.currentRoute.value.params.id?.toString() ?? "";
  if (!playlistId) return;
  playlist.value = playlistRepository.getById(playlistId)
};

const refreshPlaylist = () => {
  loadPlaylist();
  loadMusics();
}

const renderMusic = (music: MusicRecord) => {
  const path = `/render/${ music.id }`;
  router.push({ path: path, query: { playlistId: playlist.value?.id } });
}

const saveNewOrder = () => {
  if (playlist.value === null) return;
  playlist.value.musicIds = musics.value.map(music => music.id);
  playlistRepository.save(playlist.value);
}

onMounted(() => {
  refreshPlaylist()
})
</script>
