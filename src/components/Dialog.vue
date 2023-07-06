<template>
  <div class="fixed inset-0">
    <div class="absolute inset-0 bg-black opacity-20" @click="emits('onClose')"/>
    <div class="flex place-content-center place-items-center h-full p-4">
      <div class="rounded bg-white z-10 p-4 w-96">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits({ onClose: () => true })
</script>
