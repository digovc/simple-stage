<template>
  <DefaultButton>
    <div class="hover:bg-red-100 p-2 px-4 text-red-600">
      <slot/>
    </div>
  </DefaultButton>
</template>
<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";
</script>
