<template>
  <div>
    <Dialog v-if="isVisible" @onClose="isVisible = false">
      <div class="space-y-4">
        <div class="text-2xl">
          Transpose
        </div>
        <div class="flex justify-between space-x-4">
          <PrimaryButton @click="changeTranspose(false)">
            <div class="w-8 text-center">
              -
            </div>
          </PrimaryButton>
          <PrimaryButton @click="changeTranspose(true)">
            <div class="w-8 text-center">
              +
            </div>
          </PrimaryButton>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { ref } from "vue";
import { transposeService } from "@/services/transpose.service";
import PrimaryButton from "@/components/PrimaryButton.vue";

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
