<template>
  <div class="h-full flex flex-col space-y-8 p-4">
    <div class="text-5xl">
      Simple Stage
    </div>
    <div>
      <HomeMenu/>
    </div>
    <div class="space-y-12">
      <Search/>
      <Playlists/>
      <Songs/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Playlists from "@/pages/home/components/Playlists.vue";
import Search from "@/pages/home/components/Search.vue";
import Songs from "@/pages/home/components/Songs.vue";
import HomeMenu from "@/pages/home/components/HomeMenu.vue";
</script>
