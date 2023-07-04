<template>
  <div>
    <List title="Playlists">
      <ListItem v-for="playlist in playlists" :key="playlist.id" @click="openPlaylist(playlist)">
        {{ playlist.title }}
      </ListItem>
    </List>
  </div>
</template>
<script setup lang="ts">
import { onDeactivated, onMounted, ref } from "vue";
import ListItem from "@/components/ListItem.vue";
import List from "@/components/List.vue";
import type { PlaylistRecord } from "@/records/playlist.record";
import { playlistRepository } from "@/services/playlist.repository";
import { Subject, takeUntil } from "rxjs";
import { useRouter } from "vue-router";

const playlists = ref<PlaylistRecord[]>([]);
const onDestroyed$ = new Subject<void>();
const router = useRouter();

const listenPlaylistCreated = () => {
  playlistRepository.onCreated$.pipe(takeUntil(onDestroyed$)).subscribe((playlist) => {
    playlists.value.push(playlist);
  });
};

const openPlaylist = (playlist: PlaylistRecord) => {
  const playlistId = playlist?.id;
  if (!playlistId) return;
  router.push(`/playlist/${ playlistId }`);
};

onDeactivated(() => {
  onDestroyed$.next();
  onDestroyed$.complete();
})

onMounted(async () => {
  playlists.value = playlistRepository.getAll();
  listenPlaylistCreated();
})
</script>
