<template>
  <div>
    <Dialog v-if="isVisible" @onClose="isVisible = false">
      <div class="space-y-4">
        <div class="text-2xl">
          Options
        </div>
        <div class="space-x-2">
          <PrimaryButton @click="edit">
            Edit
          </PrimaryButton>
          <PrimaryButton @click="openTranspose">
            Transpose
          </PrimaryButton>
          <PrimaryButton @click="openPlaylistRelation">
            Playlists
          </PrimaryButton>
          <PrimaryButton v-if="previousMusicId" @click="openSong(previousMusicId)">
            Previous
          </PrimaryButton>
          <PrimaryButton v-if="nextMusicId" @click="openSong(nextMusicId)">
            Next
          </PrimaryButton>
        </div>
      </div>
    </Dialog>

    <PlaylistRelation ref="playlistRelationRef"/>
    <Transpose ref="transposeRef"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Transpose from "@/dialogs/transpose/Transpose.vue";
import PlaylistRelation from "@/dialogs/playlist-relation/PlaylistRelation.vue";
import { useRouter } from "vue-router";
import { playlistRepository } from "@/services/playlist.repository";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Dialog from "@/components/Dialog.vue";

const isVisible = ref<boolean>(false);
const playlistRelationRef = ref<HTMLElement>() as any;
const transposeRef = ref<HTMLElement>() as any;
const router = useRouter();
const nextMusicId = ref<string>("");
const previousMusicId = ref<string>("");

const edit = () => {
  const id = router.currentRoute.value.params.id?.toString() ?? "";
  router.push(`/editor/${ id }`);
};

const loadNextAndPrevious = () => {
  const playlistId = router.currentRoute.value.query.playlistId?.toString();
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
  if (!id) return;
  isVisible.value = false;
  const url = `/render/${ id }`;
  const query = router.currentRoute.value.query;
  router.replace({ path: url, query });
  setTimeout(()=>location.reload());
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
