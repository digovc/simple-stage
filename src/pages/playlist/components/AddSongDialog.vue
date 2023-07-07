<template>
  <div>
    <Dialog>
      <div class="space-y-4">
        <div class="text-2xl">
          Select songs
        </div>
        <div>
          <input type="text" class="w-full border p-2 rounded-full outline-none" placeholder="Search..."
                 v-model="search"/>
        </div>
        <div class="max-h-[350px] overflow-y-auto">
          <template v-for="music in musics" :key="music.id">
            <div v-if="!(music as any).isHidden">
              <div class="cursor-pointer select-none" @click="(music as any).isSelected = !(music as any).isSelected">
                <div class="flex space-x-2 place-items-center">
                  <input type="checkbox" v-model="(music as any).isSelected" ref="checkboxRef"/>
                  <div class="whitespace-nowrap text-sm">
                    {{ music.title }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="space-x-2 flex justify-end">
          <PrimaryButton @click="save">
            Save
          </PrimaryButton>
          <SecundaryButton @click="emits('onClose')">
            Cancel
          </SecundaryButton>
        </div>
      </div>
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
const checkboxRef = ref<HTMLInputElement>();
const search = ref("");

const filterMusics = () => {
  const query = search.value?.trim().toLowerCase();

  for (const music of musics.value) {
    const searchTerms = [music.tags, music.artist, music.title]
    const searchTerm = searchTerms.join(" ").trim().toLowerCase();
    (music as any).isHidden = query && !searchTerm.includes(query);
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

const save = () => {
  const playlist = getPlaylist();
  if (!playlist) return;

  for (const music of musics.value ?? []) {
    if ((music as any).isSelected && !playlist.musicIds.includes(music.id)) {
      playlist.musicIds.push(music.id);
    } else if (!(music as any).isSelected && playlist.musicIds.includes(music.id)) {
      playlist.musicIds = playlist.musicIds.filter(id => id !== music.id);
    }
  }

  playlistRepository.save(playlist)
  emits("onSave");
}

watch(search, filterMusics)

onMounted(async () => {
  musics.value = musicRepository.getAll();
  loadSelectedMusics();
})
</script>

