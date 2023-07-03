<template>
  <div class="h-full flex place-content-center place-items-center">
    Simple Stage
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  setTimeout(() => router.replace("/home"), 2000);
});
</script>
