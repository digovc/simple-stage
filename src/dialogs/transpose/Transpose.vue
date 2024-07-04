<template>
  <div>
    <Dialog v-if="isVisible" @onClose="isVisible = false">
      <div class="space-y-4">
        <div class="text-2xl">
          Transpose
        </div>
        <div class="flex justify-between space-x-4">
          <IconButton @click="changeTranspose(false)" :icon="faMinus">
          </IconButton>
          <IconButton @click="changeTranspose(true)" :icon="faPlus">
          </IconButton>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { ref } from "vue";
import { transposeService } from "@/services/transpose.service";
import IconButton from "@/components/IconButton.vue";
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const isVisible = ref<boolean>(false);

const changeTranspose = (isUp: boolean) => {
  transposeService.changeTranspose(isUp);
};

const show = () => {
  isVisible.value = true;
};

defineExpose({
  show
})
</script>
