<template>
  <div class="w-full">
    <List title="Songs" :icon="faMusic" :forceOpen="props.forceOpen">
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
import { onMounted, ref, computed } from "vue";
import type { MusicRecord } from "@/records/music.record";
import { musicRepository } from "@/services/music.repository";
import { useRouter } from "vue-router";
import { faMusic } from "@fortawesome/free-solid-svg-icons"
import List from "@/components/List.vue";
import ListItem from "@/components/ListItem.vue";

const musics = ref<MusicRecord[]>([]);
const router = useRouter();

const props = defineProps({
  forceOpen: {
    type: Boolean,
    default: false
  }
});

const hasVisibleItems = computed(() => musics.value.some(m => !(m as any).isHidden));

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const filterMusics = (query: string) => {
  if (!query) {
    for (const music of musics.value) (music as any).isHidden = false;
    return;
  }
  const normalizedQuery = normalize(query);
  for (const music of musics.value ?? []) {
    const term = normalize([music.title, music.tags, music.artist].join(" "));
    (music as any).isHidden = !term.includes(normalizedQuery);
  }
};

const render = (music: MusicRecord) => {
  router.push(`/render/${ music.id }`);
}

onMounted(async () => {
  musics.value = musicRepository.getAll();
})

defineExpose({
  filterMusics,
  hasVisibleItems
})
</script>
