<template>
  <div class="w-full">
    <List title="Playlists">
      <template v-for="playlist in playlists" :key="playlist.id">
        <ListItem v-if="!(playlist as any).isHidden" @click="openPlaylist(playlist)">
          {{ playlist.title }}
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script setup lang="ts">
import { onDeactivated, onMounted, onUnmounted, ref } from "vue";
import ListItem from "@/components/ListItem.vue";
import List from "@/components/List.vue";
import type { PlaylistRecord } from "@/records/playlist.record";
import { playlistRepository } from "@/services/playlist.repository";
import { Subject, takeUntil } from "rxjs";
import { useRouter } from "vue-router";

const playlists = ref<PlaylistRecord[]>([]);
const onDestroyed$ = new Subject<void>();
const router = useRouter();

const filterPlaylists = (query: string) => {
  for (const playlist of playlists.value ?? []) {
    const term = [playlist.title, playlist.tags].join(" ").toLowerCase();
    (playlist as any).isHidden = term && !term.includes(query);
  }
};

const listenPlaylistCreated = () => {
  playlistRepository.onCreated$.pipe(takeUntil(onDestroyed$)).subscribe((playlist) => {
    playlists.value.push(playlist);
  });
};

const loadPlaylists = () => {
  const playlistsTemp = playlistRepository.getAll();
  playlistsTemp.reverse();
  playlists.value = playlistsTemp;
};

const openPlaylist = (playlist: PlaylistRecord) => {
  const playlistId = playlist?.id;
  if (!playlistId) return;
  router.push(`/playlist/${ playlistId }`);
};
onMounted(async () => {
  loadPlaylists();
  listenPlaylistCreated();
})

onUnmounted(() => {
  onDestroyed$.next();
  onDestroyed$.complete();
})

defineExpose({
  filterPlaylists
})
</script>
