<template>
  <div class="h-full font-mono p-2 relative">
    <div>
      <div class="font-semibold">
        {{ firstLine }}
      </div>
      <div class="pb-96">
        <div v-for="line in renderLines" :id="line.id">
          <ParagraphRender v-if="line.type === 'paragraph'" :line="line"/>
          <ChordsRender v-if="line.type === 'chords'" :line="line"/>
          <PhraseRender v-if="line.type === 'phrase'" :line="line"/>
        </div>
      </div>
    </div>
    <div class="fixed top-2 right-4 py-2 flex justify-end space-x-2">
      <PrimaryButton @click="edit">
        Edit
      </PrimaryButton>
      <SecundaryButton @click="showMenu">
        Menu
      </SecundaryButton>
    </div>

    <RenderMenu ref="renderMenuRef"/>
  </div>
</template>

<script setup lang="ts">
import { onDeactivated, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { MusicRecord } from "@/records/music.record";
import { musicRepository } from "@/services/music.repository";
import type { RenderLineModel } from "@/models/render-line.model";
import ChordsRender from "@/pages/render/components/ChordsRender.vue";
import PhraseRender from "@/pages/render/components/PhraseRender.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import SecundaryButton from "@/components/SecundaryButton.vue";
import RenderMenu from "@/pages/render/components/RenderMenu.vue";
import { transposeService } from "@/services/transpose.service";
import { Subject, takeUntil } from "rxjs";
import * as ChordTransposer from 'chord-transposer';
import ParagraphRender from "@/pages/render/components/ParagraphRender.vue";


const id = ref<string>("");
const router = useRouter();
const music = ref<MusicRecord>({} as MusicRecord);
const renderLines = ref<RenderLineModel[]>([]);
const firstLine = ref<string>("");
const renderMenuRef = ref<HTMLElement>() as any;
const onDestroyed$ = new Subject<void>();

const backToHome = () => {
  router.replace('/home');
};

const detectIsChords = (line: string) => {
  const letterCount = line.length;
  const spaceCount = line.split(" ").length - 1;
  const isSpacePercentage = spaceCount / letterCount > 0.3;
  const words = line.split(" ").filter((word) => word?.trim());
  const isAllWordsChords = words.every((word) => word?.trim().match(/^[A-G].*$/));
  return isSpacePercentage && isAllWordsChords;
};

const edit = () => {
  router.replace(`/editor/${ id.value }`);
};

const getContentLine = (lines: string[], index: number) => {
  if (index >= lines.length) return "";
  return lines[index];
};

const listenTranspose = () => {
  transposeService.onTranspose$.pipe(takeUntil(onDestroyed$)).subscribe((isUp) => {
    transposeChords(isUp);
  });
}

const loadMusic = () => {
  id.value = router.currentRoute.value.params.id?.toString() ?? "";
  if (!id.value) return backToHome();
  music.value = musicRepository.getById(id.value) as MusicRecord;
  if (!music.value) return backToHome();
  render(music.value)
};

const render = (music: MusicRecord) => {
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
  const isChords = detectIsChords(line);
  const isParagraph = !isChords && line?.trim().startsWith("[") && line?.trim().endsWith("]");
  const type = isChords ? "chords" : isParagraph ? "paragraph" : "phrase";

  let text = line;

  if (isChords) {
    text = transposeLineByNumber(text, music.value.transpose ?? 0);
  }

  lines.push({ id: index.toString(), text: text, type } as RenderLineModel);
};

const showMenu = () => {
  renderMenuRef.value?.show();
};

const transposeChords = (isUp: boolean) => {
  for (const line of renderLines.value ?? []) {
    if (line.type !== 'chords') continue;
    line.text = transposeLine(line.text, isUp);
  }

  let transpose = music.value.transpose ?? 0;
  transpose = isUp ? transpose + 1 : transpose - 1;

  while (transpose > 11) transpose -= 12;
  while (transpose < -11) transpose += 12;

  music.value.transpose = transpose;
  musicRepository.save(music.value);
}

const transposeLine = (line: string, isUp: boolean) => {
  if (isUp) {
    return ChordTransposer.transpose(line).up(1).toString();
  } else {
    return ChordTransposer.transpose(line).down(1).toString();
  }
}

const transposeLineByNumber = (line: string, transpose: number) => {
  if (transpose != 0) {
    return ChordTransposer.transpose(line).up(transpose).toString();
  } else {
    return line;
  }
}

onDeactivated(() => {
  onDestroyed$.next();
  onDestroyed$.complete();
})

onMounted(() => {
  loadMusic();
  listenTranspose();
})
</script>
