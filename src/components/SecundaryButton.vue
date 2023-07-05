<template>
  <DefaultButton>
    <div class="hover:bg-gray-100 p-2 px-4">
      <slot/>
    </div>
  </DefaultButton>
</template>
<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";
</script>
