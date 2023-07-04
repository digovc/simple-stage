<template>
  <div>
    <Menu v-if="isVisible" @onClose="isVisible = false">
      <MenuItem @click="openTranspose">
        Transpose
      </MenuItem>
      <MenuItem @click="openPlaylistRelation">
        Add to playlist
      </MenuItem>
      <MenuItem v-if="previousMusicId" @click="openSong(previousMusicId)">
        Previous song
      </MenuItem>
      <MenuItem v-if="nextMusicId" @click="openSong(nextMusicId)">
        Next song
      </MenuItem>
    </Menu>

    <PlaylistRelation ref="playlistRelationRef"/>
    <Transpose ref="transposeRef"/>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import MenuItem from "@/components/MenuItem.vue";
import { onMounted, ref } from "vue";
import Transpose from "@/dialogs/transpose/Transpose.vue";
import PlaylistRelation from "@/dialogs/playlist-relation/PlaylistRelation.vue";
import { useRouter } from "vue-router";
import { playlistRepository } from "@/services/playlist.repository";

const isVisible = ref<boolean>(false);
const playlistRelationRef = ref<HTMLElement>() as any;
const transposeRef = ref<HTMLElement>() as any;
const router = useRouter();
const nextMusicId = ref<string>("");
const previousMusicId = ref<string>("");

const loadNextAndPrevious = () => {
  const playlistId = router.currentRoute.value.params.playlistId?.toString() ?? "";
  if (!playlistId) return;
  const playlist = playlistRepository.getById(playlistId);
  if (!playlist) return;
  playlist.musicIds = playlist.musicIds ?? [];
  const musicId = router.currentRoute.value.params.id?.toString() ?? "";
  const index = playlist.musicIds.indexOf(musicId);
  if (index === -1) return;
  const nextIndex = index + 1;

  if (nextIndex < playlist.musicIds.length) {
    nextMusicId.value = playlist.musicIds[nextIndex];
  }

  const previousIndex = index - 1;

  if (previousIndex >= 0) {
    previousMusicId.value = playlist.musicIds[previousIndex];
  }
};

const openPlaylistRelation = () => {
  isVisible.value = false;
  playlistRelationRef.value?.show();
};

const openSong = (id: string) => {
  isVisible.value = false;
  router.replace(`/render/${ id }`);
};

const openTranspose = () => {
  isVisible.value = false;
  transposeRef.value?.show();
};

const show = () => {
  isVisible.value = true;
};

onMounted(() => {
  loadNextAndPrevious();
})

defineExpose({
  show
})

</script>
