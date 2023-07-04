<template>
  <div class="h-full p-4 space-y-4 flex flex-col">
    <div>
      Editor
    </div>
    <div class="grow border rounded focus-within:outline outline-gray-200 outline-1 overflow-x-hidden">
      <textarea class="w-full h-full p-2 pt-1 -mb-1.5 outline-none resize-none font-mono text-gray-700"
                v-model="content"/>
    </div>
    <div class="flex justify-end space-x-2">
      <PrimaryButton @click="save">
        Save
      </PrimaryButton>
      <SecundaryButton @click="cancel">
        Cancel
      </SecundaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecundaryButton from "@/components/SecundaryButton.vue";
import { onMounted, ref } from "vue";
import type { MusicModel } from "@/models/music.model";
import { musicRepository } from "@/services/music.repository";
import { useRouter } from "vue-router";

const id = ref<string>("");
const content = ref<string>("");
const router = useRouter();

const cancel = () => {
  router.back();
};

const getMusicLine = (line: number) => {
  const lines = content.value.split("\n");

  if (lines.length > line) {
    return lines[line];
  }
};

const loadMusic = () => {
  id.value = router.currentRoute.value.params.id?.toString() ?? "";
  if (!id.value) return;
  const music = musicRepository.getById(id.value)
  content.value = music?.content ?? "";
};

const save = () => {
  if (!content.value) return;

  const title = getMusicLine(0);
  const artist = getMusicLine(1);
  const tags = getMusicLine(2)?.split(" ") ?? [];

  const music = {
    id: id.value,
    title: title,
    artist: artist,
    tags: tags,
    content: content.value
  } as MusicModel

  musicRepository.save(music);
  router.back();
};

onMounted(() => {
  loadMusic();
});
</script>
