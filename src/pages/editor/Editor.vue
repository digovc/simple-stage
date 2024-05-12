<template>
  <div class="h-full p-2 space-y-2 flex flex-col">
    <div class="text-2xl">
      Editor
    </div>
    <div class="grow border rounded focus-within:shadow outline-1 overflow-x-hidden">
      <textarea class="w-full h-full p-2 pt-1 -mb-1.5 outline-none resize-none font-mono text-gray-700"
                v-model="content" placeholder="Put your music here..."></textarea>
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
import type { MusicRecord } from "@/records/music.record";
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
  const tags = getMusicLine(2)?.split(" ").map(x => x?.trim()).filter(x => x) ?? [];

  const music = {
    id: id.value,
    title: title,
    artist: artist,
    tags: tags,
    content: content.value
  } as MusicRecord

  musicRepository.save(music);
  router.back();
};

onMounted(() => {
  loadMusic();
});
</script>
