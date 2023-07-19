<template>
  <div class="space-y-4 h-full flex flex-col pt-2">
    <div class="text-2xl px-2">
      {{ playlist?.title }}
    </div>
    <div class="px-2">
      <PlaylistMenu v-if="playlist" :playlist="playlist" @onMusicsChanged="refreshPlaylist"/>
    </div>
    <div class="text-lg px-2">
      Songs
    </div>
    <div class="grow overflow-y-auto p-2 pb-48">
      <draggable class="space-y-2" :list="musics" @change="saveNewOrder">
        <div v-for="music in musics" :key="music.id"
             class="border p-1 px-2 rounded cursor-pointer flex hover:shadow bg-white">
          <div class="flex w-full space-x-2 whitespace-nowrap overflow-x-hidden">
            <input type="checkbox" v-model="(music as any).isSelected"
                   @change="refreshMusicSelected(music.id, (music as any).isSelected)"/>
            <div class="grow" @click="renderMusic(music)">
              {{ music.title }}
            </div>
            <div class="text-sm pt-1 text-gray-600" @click="renderMusic(music)">
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
    (music as any).isSelected = playlist.value.selectedMusicIds?.includes(musicId) ?? false;
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

const refreshMusicSelected = (musicId: string, isSelected: boolean) => {
  if (playlist.value === null) return;
  const selectedMusicIds = playlist.value.selectedMusicIds ?? [];

  if (isSelected && !selectedMusicIds.includes(musicId)) {
    selectedMusicIds.push(musicId);
  } else {
    const index = selectedMusicIds.indexOf(musicId);

    if (index > -1) {
      selectedMusicIds.splice(index, 1);
    }
  }

  playlist.value.selectedMusicIds = selectedMusicIds;
  playlistRepository.save(playlist.value);
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
