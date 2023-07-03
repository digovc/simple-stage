<template>
  <div class="h-full font-mono p-2 relative">
    <div>
      <div class="font-semibold">
        {{ firstLine }}
      </div>
      <div>
        <div v-for="line in renderLines" :id="line.id">
          <ChordsRender v-if="line.isChords" :line="line"/>
          <PhraseRender v-else :line="line"/>
        </div>
      </div>
    </div>
    <div class="fixed top-2 right-4 py-2 flex justify-end">
      <PrimaryButton @click="edit">
        Edit
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { MusicModel } from "@/models/music.model";
import { musicRepository } from "@/services/music.repository";
import type { RenderLineModel } from "@/models/render-line.model";
import ChordsRender from "@/pages/render/components/ChordsRender.vue";
import PhraseRender from "@/pages/render/components/PhraseRender.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

const id = ref<string>("");
const router = useRouter();
const music = ref<MusicModel>();
const renderLines = ref<RenderLineModel[]>([]);
const firstLine = ref<string>("");

const backToHome = () => {
  router.replace('/home');
};

const edit = () => {
  router.replace(`/editor/${ id.value }`);
};

const getContentLine = (lines: string[], index: number) => {
  if (index >= lines.length) return "";
  return lines[index];
};

const loadMusic = () => {
  id.value = router.currentRoute.value.params.id?.toString() ?? "";
  if (!id.value) return backToHome();
  music.value = musicRepository.getById(id.value) as MusicModel;
  if (!music.value) return backToHome();
  render(music.value)
};

const render = (music: MusicModel) => {
  if (!music) return;
  if (!music.content) return;

  const lines = [] as RenderLineModel[];
  const contentLines = music.content.split("\n");
  const title = getContentLine(contentLines, 0);
  const artist = getContentLine(contentLines, 1);
  const tags = getContentLine(contentLines, 2);
  firstLine.value = `${ title } - ${ artist } - ${ tags }`;

  for (let i = 3; i < contentLines.length; i++) {
    const line = contentLines[i];
    renderLine(lines, line, i);
  }

  renderLines.value = lines;
};

const renderLine = (lines: RenderLineModel[], line: string, index: number) => {
  const letterCount = line.length;
  const spaceCount = line.split(" ").length - 1;
  const isChords = spaceCount > letterCount / 2;
  lines.push({ id: index.toString(), text: line, isChords });
};

onMounted(() => {
  loadMusic();
})
</script>
