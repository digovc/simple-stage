<template>
  <DefaultButton>
    <div class="hover:bg-gray-700 p-2 px-4 border border-gray-300 rounded">
      <slot/>
    </div>
  </DefaultButton>
</template>
<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";
</script>
