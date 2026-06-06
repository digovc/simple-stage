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
      <draggable class="space-y-2" :list="musics" @change="saveNewOrder" handle=".handle">
        <div v-for="music in musics" :key="music.id"
             class="px-4 py-3 rounded-lg flex transition-colors duration-150 bg-white/[0.04] hover:bg-white/[0.08]">
          <div class="flex items-center w-full gap-3 whitespace-nowrap overflow-x-hidden">
            <input type="checkbox" v-model="(music as any).isSelected"
                   class="w-4 h-4 accent-emerald-500 cursor-pointer"
                   @change="refreshMusicSelected(music.id, (music as any).isSelected)"/>
            <div class="grow cursor-pointer text-sm" :class="{ 'line-through opacity-50': (music as any).isSelected }" @click="renderMusic(music)">
              {{ music.title }}
            </div>
            <div class="text-xs opacity-40 cursor-pointer" :class="{ 'line-through': (music as any).isSelected }" @click="renderMusic(music)">
              {{ music.artist }}
            </div>
            <FontAwesomeIcon :icon="faGripLines" class="opacity-30 hover:opacity-60 cursor-move text-lg handle transition-opacity duration-150"/>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";

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
    if (music) {
      (music as any).isSelected = playlist.value.selectedMusicIds?.includes(musicId) ?? false;
      musics.value.push(music);
    }
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

  if (isSelected) {
    // Mark this song and all preceding songs as selected
    const clickedIndex = musics.value.findIndex(m => m.id === musicId);
    if (clickedIndex === -1) return;
    for (let i = 0; i <= clickedIndex; i++) {
      const id = musics.value[i].id;
      if (!selectedMusicIds.includes(id)) {
        selectedMusicIds.push(id);
      }
      (musics.value[i] as any).isSelected = true;
    }
  } else {
    // Unmark this song and all following songs
    const clickedIndex = musics.value.findIndex(m => m.id === musicId);
    if (clickedIndex === -1) return;
    for (let i = clickedIndex; i < musics.value.length; i++) {
      const id = musics.value[i].id;
      const idx = selectedMusicIds.indexOf(id);
      if (idx > -1) {
        selectedMusicIds.splice(idx, 1);
      }
      (musics.value[i] as any).isSelected = false;
    }
  }

  playlist.value.selectedMusicIds = selectedMusicIds;
  playlistRepository.save(playlist.value);
};

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
