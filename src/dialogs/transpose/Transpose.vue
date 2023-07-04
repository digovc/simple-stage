<template>
  <div>
    <Dialog v-if="isVisible" @onClose="isVisible = false">
      <div class="space-y-4">
        <div>
          Transpose
        </div>
        <div class="grid grid-cols-2 gap-4">
          <TransposeButton @click="changeTranspose(false)">
            -
          </TransposeButton>
          <TransposeButton @click="changeTranspose(true)">
            +
          </TransposeButton>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { ref } from "vue";
import TransposeButton from "@/dialogs/transpose/components/TransposeButton.vue";
import { transposeService } from "@/services/transpose.service";

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
