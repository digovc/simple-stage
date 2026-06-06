<template>
  <div>
    <div class="space-x-2">
      <PrimaryButton @click="isAddSongDialogVisible = true">
        Songs
      </PrimaryButton>
      <SecundaryButton @click="backToHome">
        Close
      </SecundaryButton>
      <DangerButton @click="deletePlaylist">
        Delete
      </DangerButton>
    </div>

    <AddSongDialog v-if="isAddSongDialogVisible" @onClose="isAddSongDialogVisible = false" @onSave="changePlaylist"/>

    <ConfirmDialog
      :visible="confirm.visible.value"
      :title="confirm.title.value"
      :message="confirm.message.value"
      @on-confirm="confirm.onConfirm"
      @on-cancel="confirm.onCancel"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ref } from "vue";
import type { PlaylistRecord } from "@/records/playlist.record";
import { playlistRepository } from "@/services/playlist.repository";
import { useRouter } from "vue-router";
import DangerButton from "@/components/DangerButton.vue";
import SecundaryButton from "@/components/SecundaryButton.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import AddSongDialog from "@/pages/playlist/components/AddSongDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { useConfirm } from "@/composables/useConfirm";

const router = useRouter();
const isAddSongDialogVisible = ref(false);
const confirm = useConfirm();
const emits = defineEmits(["onMusicsChanged"]);

const props = defineProps({
  playlist: {
    type: Object as PropType<PlaylistRecord>,
    required: true
  }
});

const backToHome = () => {
  router.replace("/home");
}

const changePlaylist = () => {
  isAddSongDialogVisible.value = false;
  emits("onMusicsChanged");
}

const deletePlaylist = async () => {
  const confirmed = await confirm.ask({
    title: "Excluir playlist",
    message: `Deseja realmente excluir \"${props.playlist.title}\"?`
  });
  if (!confirmed) return;
  playlistRepository.delete(props.playlist.id);
  router.replace("/home");
}
</script>
