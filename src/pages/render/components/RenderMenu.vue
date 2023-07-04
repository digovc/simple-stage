<template>
  <div>
    <Menu v-if="isVisible" @onClose="isVisible = false">
      <MenuItem @click="openTranspose">
        Transpose
      </MenuItem>
      <MenuItem @click="openPlaylistRelation">
        Add to playlist
      </MenuItem>
    </Menu>

    <PlaylistRelation ref="playlistRelationRef"/>
    <Transpose ref="transposeRef"/>
  </div>
</template>

<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import MenuItem from "@/components/MenuItem.vue";
import { ref } from "vue";
import Transpose from "@/dialogs/transpose/Transpose.vue";
import PlaylistRelation from "@/dialogs/playlist-relation/PlaylistRelation.vue";

const isVisible = ref<boolean>(false);
const playlistRelationRef = ref<HTMLElement>() as any;
const transposeRef = ref<HTMLElement>() as any;

const openPlaylistRelation = () => {
  isVisible.value = false;
  playlistRelationRef.value?.show();
};

const openTranspose = () => {
  isVisible.value = false;
  transposeRef.value?.show();
};

const show = () => {
  isVisible.value = true;
};

defineExpose({
  show
})

</script>
