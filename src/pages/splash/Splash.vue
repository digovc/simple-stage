<template>
  <div class="bg-gray-100 h-full flex place-content-center place-items-center p-48">
    <div class="bg-center bg-no-repeat w-full h-full"
         :style="`background-image: url(${logoUrl})`"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import logoUrl from "@/assets/logo-white.svg";

const router = useRouter();

onMounted(() => {
  setTimeout(() => router.replace("/home"), 2000);
});
</script>
