<template>
  <div class="w-full">
    <List title="Songs">
      <template v-for="music in musics" :key="music.id">
        <ListItem v-if="!(music as any).isHidden" @click="render(music)">
          <div class="text-xs">
            {{ music.title }}
          </div>
        </ListItem>
      </template>
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

const filterMusics = (query: string) => {
  for (const music of musics.value ?? []) {
    const term = [music.title, music.tags, music.artist].join(" ").toLowerCase();
    (music as any).isHidden = term && !term.includes(query);
  }
};

const render = (music: MusicRecord) => {
  router.push(`/render/${ music.id }`);
}

onMounted(async () => {
  musics.value = musicRepository.getAll();
})

defineExpose({
  filterMusics
})
</script>
