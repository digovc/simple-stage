<template>
  <div class="h-full flex place-content-center place-items-center">
    <div class="bg-center bg-gray-100 bg-no-repeat w-screen h-screen absolute"
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
