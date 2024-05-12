<template>
  <div class="h-full text-white">
    <div class="bg-gray-600 w-screen h-screen absolute -z-10 flex justify-center pt-80">
      <div :style="`background-image: url(${logoUrl})`" class="bg-no-repeat bg-center w-80 h-80 opacity-5"/>
    </div>
    <RouterView/>
  </div>
</template>
<script setup lang="ts">
import logoUrl from "@/assets/logo-white.svg";
</script>
