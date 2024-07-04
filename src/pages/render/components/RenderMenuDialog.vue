<template>
  <div>
    <Dialog v-if="isVisible" @onClose="isVisible = false">
      <div class="space-y-4">
        <div class="text-2xl">
          Options
        </div>
        <div class="text-center space-x-2 flex justify-between">
          <IconButton :icon="faEdit" @click="edit"/>
          <IconButton :icon="faMusic" @click="openTranspose"/>
          <IconButton v-if="previousMusicId" :icon="faChevronLeft" @click="openSong(previousMusicId)"/>
          <IconButton v-if="nextMusicId" :icon="faChevronRight" @click="openSong(nextMusicId)"/>
        </div>
      </div>
    </Dialog>

    <PlaylistRelation ref="playlistRelationRef"/>
    <Transpose ref="transposeRef"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Transpose from "@/dialogs/transpose/Transpose.vue";
import PlaylistRelation from "@/dialogs/playlist-relation/PlaylistRelation.vue";
import { useRoute, useRouter } from "vue-router";
import { playlistRepository } from "@/services/playlist.repository";
import IconButton from "@/components/IconButton.vue";
import Dialog from "@/components/Dialog.vue";
import { faChevronLeft, faChevronRight, faEdit, faMusic } from '@fortawesome/free-solid-svg-icons';

const isVisible = ref<boolean>(false);
const playlistRelationRef = ref<HTMLElement>() as any;
const transposeRef = ref<HTMLElement>() as any;
const router = useRouter();
const route = useRoute();
const nextMusicId = ref<string>("");
const previousMusicId = ref<string>("");

const edit = () => {
  const id = route.params.id?.toString() ?? "";
  router.push(`/editor/${ id }`);
};

const loadNextAndPrevious = () => {
  const playlistId = route.query.playlistId?.toString();
  if (!playlistId) return;
  const playlist = playlistRepository.getById(playlistId);
  if (!playlist) return;
  playlist.musicIds = playlist.musicIds ?? [];
  const musicId = route.params.id?.toString() ?? "";
  const index = playlist.musicIds.indexOf(musicId);
  if (index === -1) return;
  const nextIndex = index + 1;

  if (nextIndex < playlist.musicIds.length) {
    nextMusicId.value = playlist.musicIds[nextIndex];
  } else {
    nextMusicId.value = "";
  }

  const previousIndex = index - 1;

  if (previousIndex >= 0) {
    previousMusicId.value = playlist.musicIds[previousIndex];
  } else {
    previousMusicId.value = "";
  }
};

const openPlaylistRelation = () => {
  isVisible.value = false;
  playlistRelationRef.value?.show();
};

const openSong = (id: string) => {
  if (!id) return;
  isVisible.value = false;
  const url = `/render/${ id }`;
  const query = route.query;
  router.replace({ path: url, query });
};

const openTranspose = () => {
  isVisible.value = false;
  transposeRef.value?.show();
};

const show = () => {
  loadNextAndPrevious();
  isVisible.value = true;
};

onMounted(() => {
  loadNextAndPrevious();
});

watch(() => route.params.id, () => {
  loadNextAndPrevious();
});

defineExpose({
  show
});
</script>
