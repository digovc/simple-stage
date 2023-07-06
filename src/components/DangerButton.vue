<template>
  <DefaultButton>
    <div class="p-2 px-4 text-red-600 rounded border border-red-100">
      <slot/>
    </div>
  </DefaultButton>
</template>
<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";
</script>
