<template>
  <div>
    <List title="Musics">
      <ListItem v-for="music in musics" :key="music.id" @click="render(music)">
        {{ music.title }}
      </ListItem>
    </List>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { MusicRecord } from "@/records/music.record";
import { musicRepository } from "@/services/music.repository";
import { useRouter } from "vue-router";
import List from "@/components/List.vue";
import ListItem from "@/components/ListItem.vue";

const musics = ref<MusicRecord[]>([]);
const router = useRouter();

const render = (music: MusicRecord) => {
  router.push(`/render/${ music.id }`);
}

onMounted(async () => {
  musics.value = musicRepository.getAll();
})
</script>
