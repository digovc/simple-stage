<template>
  <DefaultButton>
    <div class="bg-red-500/10 text-red-400 hover:bg-red-500/20 p-2 px-4 rounded-lg transition-colors duration-200">
      <slot/>
    </div>
  </DefaultButton>
</template>
<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";
</script>
