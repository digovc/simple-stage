<template>
  <div>
    <Dialog>
      <form class="space-y-4" @submit.prevent="save">
        <div class="text-2xl">
          Select songs
        </div>
        <div class="flex">
          <div class="rounded-full py-2 px-4 inline-flex items-center gap-2 w-full bg-white/[0.06] focus-within:bg-white/[0.09] transition-colors duration-150">
            <svg class="w-4 h-4 opacity-40 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3" stroke-linecap="round"/>
            </svg>
            <input ref="searchInput" type="text" placeholder="Search" class="w-full outline-none bg-transparent text-white placeholder-white/30 text-sm" v-model="search"/>
          </div>
        </div>
        <div class="max-h-[350px] overflow-y-auto space-y-2">
          <template v-for="music in musics" :key="music.id">
            <div
              v-if="!(music as any).isHidden"
              class="px-4 py-3 rounded-lg cursor-pointer select-none transition-colors duration-150"
              :class="(music as any).isSelected ? 'bg-emerald-500/20 ring-1 ring-emerald-500/30' : 'bg-white/[0.04] hover:bg-white/[0.08]'"
              @click="toggleMusicSelection(music)"
            >
              <div class="flex items-center gap-3">
                <div class="shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150"
                     :class="(music as any).isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'">
                  <svg v-if="(music as any).isSelected" class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="text-sm truncate" :class="(music as any).isSelected ? 'text-emerald-100' : 'text-white'">
                  {{ music.title }}
                </div>
              </div>
            </div>
          </template>
          <div v-if="!musics.some(m => !(m as any).isHidden)" class="text-white/30 text-sm text-center py-8">
            Nothing found
          </div>
        </div>
        <div class="space-x-2 flex justify-end">
          <PrimaryButton type="submit">
            Save
          </PrimaryButton>
          <SecundaryButton @click="emits('onClose')">
            Cancel
          </SecundaryButton>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { onMounted, ref, watch } from "vue";
import { musicRepository } from "@/services/music.repository";
import type { MusicRecord } from "@/records/music.record";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecundaryButton from "@/components/SecundaryButton.vue";
import { useRouter } from "vue-router";
import { playlistRepository } from "@/services/playlist.repository";

const musics = ref<MusicRecord[]>([]);
const emits = defineEmits(["onClose", "onSave"]);
const router = useRouter();
const search = ref("");
const searchInput = ref<HTMLInputElement | null>(null);
const newlySelectedMusicIds = ref<string[]>([]);

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const filterMusics = () => {
  const query = search.value?.trim();
  if (!query) {
    for (const music of musics.value) (music as any).isHidden = false;
    return;
  }
  const normalizedQuery = normalize(query);

  for (const music of musics.value) {
    const searchTerms = [music.tags, music.artist, music.title]
    const searchTerm = normalize(searchTerms.join(" ").trim());
    (music as any).isHidden = !searchTerm.includes(normalizedQuery);
  }
}

const getPlaylist = () => {
  const playlistId = router.currentRoute.value.params.id?.toString();
  if (!playlistId) return;
  const playlist = playlistRepository.getById(playlistId);
  if (!playlist) return;
  return playlist;
}

const loadSelectedMusics = () => {
  const playlist = getPlaylist();
  if (!playlist) return;

  for (const music of musics.value ?? []) {
    (music as any).isSelected = playlist.musicIds.includes(music.id);
  }
}

const toggleMusicSelection = (music: MusicRecord) => {
  (music as any).isSelected = !(music as any).isSelected;
  if ((music as any).isSelected) {
    if (!newlySelectedMusicIds.value.includes(music.id)) {
      newlySelectedMusicIds.value.push(music.id);
    }
  } else {
    const index = newlySelectedMusicIds.value.indexOf(music.id);
    if (index > -1) {
      newlySelectedMusicIds.value.splice(index, 1);
    }
  }
}

const save = () => {
  const playlist = getPlaylist();
  if (!playlist) return;

  for (const musicId of newlySelectedMusicIds.value) {
    if (!playlist.musicIds.includes(musicId)) {
      playlist.musicIds.push(musicId);
    }
  }

  playlist.musicIds = playlist.musicIds.filter(id => {
    const music = musics.value.find(m => m.id === id);
    return music && (music as any).isSelected;
  });

  playlistRepository.save(playlist)
  emits("onSave");
}

watch(search, filterMusics)

onMounted(async () => {
  musics.value = musicRepository.getAll();
  loadSelectedMusics();
  searchInput.value?.focus();
})
</script>
