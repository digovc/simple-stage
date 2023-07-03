<template>
  <div class="space-y-4">
    <h1>
      Musics
    </h1>
    <div class="grid grid-cols-4 gap-4">
      <Music v-for="music in musics" :key="music.id" :music="music"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { MusicModel } from "@/models/music.model";
import Music from "@/pages/home/components/Music.vue";
import { musicRepository } from "@/services/music.repository";

const musics = ref<MusicModel[]>([]);

onMounted(async () => {
  musics.value = musicRepository.getAll();
})
</script>
