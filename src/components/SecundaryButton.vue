<template>
  <DefaultButton>
    <div class="bg-white/5 hover:bg-white/10 p-2 px-4 rounded-lg transition-colors duration-200">
      <slot/>
    </div>
  </DefaultButton>
</template>
<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";
</script>
