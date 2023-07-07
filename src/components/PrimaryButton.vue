<template>
  <DefaultButton>
    <div class="bg-green-500 text-white hover:bg-green-600 p-2 px-4 rounded">
      <slot/>
    </div>
  </DefaultButton>
</template>
<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";
</script>
