<template>
  <div class="h-full">
    <div class="bg-center bg-gray-100 bg-no-repeat w-screen h-screen absolute -z-10 opacity-20"
         :style="`background-image: url(${logoUrl})`"/>
    <RouterView/>
  </div>
</template>
<script setup lang="ts">
import logoUrl from "@/assets/logo-white.svg";
</script>
