<template>
  <div>
    <Dialog v-if="isVisible" @onClose="isVisible = false">
      Transpose works!
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { ref } from "vue";

const isVisible = ref<boolean>(false);

const show = () => {
  isVisible.value = true;
};

defineExpose({
  show
})
</script>
