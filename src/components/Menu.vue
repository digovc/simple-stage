<template>
  <div>
    <Dialog @onClose="emits('onClose')">
      <div class="space-y-4">
        <div class="text-center">
          Menu
        </div>
        <div class="grid grid-cols-2 gap-4">
          <slot/>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";

const emits = defineEmits({ onClose: () => true });
</script>
