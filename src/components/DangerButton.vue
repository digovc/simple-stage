<template>
  <DefaultButton>
    <div class="p-2 px-4 text-red-300 hover:bg-gray-700 rounded border border-red-300">
      <slot/>
    </div>
  </DefaultButton>
</template>
<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";
</script>
