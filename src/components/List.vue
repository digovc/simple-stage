<template>
  <div class="space-y-4">
    <div class="text-2xl">
      {{ title }}
    </div>
    <div class="grid grid-cols-4 gap-4">
      <slot/>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
