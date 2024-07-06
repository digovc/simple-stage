<template>
  <div ref="divContainerRef" class="h-full font-mono relative" @touchstart="handleTouchStart"
       @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <div class="h-full flex flex-col">
      <div class="font-semibold p-2">
        {{ firstLine }}
      </div>
      <div class="pb-24 overflow-x-auto grow p-2">
        <template v-for="line in renderLines" :key="line.id">
          <ParagraphRender v-if="line.type === 'paragraph'" :line="line" :style="{ fontSize: `${chordsFontSize}px` }"/>
          <ChordsRender v-if="line.type === 'chords'" :line="line" :style="{ fontSize: `${chordsFontSize}px` }"/>
          <PhraseRender v-if="line.type === 'phrase'" :line="line" :style="{ fontSize: `${chordsFontSize}px` }"/>
        </template>
      </div>
    </div>
    <div class="fixed top-6 md:top-2 right-4 py-2 flex justify-end space-x-2 opacity-80">
      <IconButton :isDisabled="!previousMusicId" @click="openSong(previousMusicId)" :icon="faChevronLeft"/>
      <IconButton :isDisabled="!nextMusicId" @click="openSong(nextMusicId)" :icon="faChevronRight"/>
      <IconButton @click="increaseFontSize" :icon="faPlus"/>
      <IconButton @click="decreaseFontSize" :icon="faMinus"/>
      <IconButton @click="edit" :icon="faPen"/>
      <IconButton @click="openTranspose" :icon="faMusic"/>
      <IconButton @click="requestFullscreen" :icon="faExpand"/>
      <IconButton @click="backToPreviusPage" :icon="faTimes"/>
    </div>
    <Transpose ref="transposeRef"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { MusicRecord } from "@/records/music.record";
import { musicRepository } from "@/services/music.repository";
import type { RenderLineModel } from "@/models/render-line.model";
import ChordsRender from "@/pages/render/components/ChordsRender.vue";
import PhraseRender from "@/pages/render/components/PhraseRender.vue";
import IconButton from "@/components/IconButton.vue";
import { transposeService } from "@/services/transpose.service";
import { Subject, takeUntil } from "rxjs";
import * as ChordTransposer from 'chord-transposer';
import ParagraphRender from "@/pages/render/components/ParagraphRender.vue";
import Transpose from "@/dialogs/transpose/Transpose.vue";
import { fullscreenService } from "@/services/fullscreen.service";
import {
  faChevronLeft,
  faChevronRight,
  faExpand,
  faMinus,
  faMusic,
  faPen,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { playlistRepository } from "@/services/playlist.repository";

const chordsFontSize = ref<number>(16);
const divContainerRef = ref<HTMLElement>() as any;
const firstLine = ref<string>("");
const id = ref<string>("");
const minSwipeDistance = 50;
const music = ref<MusicRecord>({} as MusicRecord);
const nextMusicId = ref<string>("");
const onDestroyed$ = new Subject<void>();
const previousMusicId = ref<string>("");
const renderLines = ref<RenderLineModel[]>([]);
const route = useRoute();
const router = useRouter();
const touchEndX = ref<number | null>(null);
const touchStartX = ref<number | null>(null);
const transposeRef = ref<HTMLElement>() as any;

const backToPreviusPage = () => {
  router.back()
};

const detectIsChords = (line: string) => {
  const letterCount = line.length;
  const spaceCount = line.split(" ").length - 1;
  const isSpacePercentage = spaceCount / letterCount > 0.3;
  const words = line.split(" ").filter((word) => word?.trim());
  const isAllWordsChords = words.every((word) => word?.trim().match(/^[A-G].*$/));
  return isSpacePercentage && isAllWordsChords;
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
  id.value = route.params.id?.toString() ?? "";
  if (!id.value) return backToPreviusPage();
  music.value = musicRepository.getById(id.value) as MusicRecord;
  if (!music.value) return backToPreviusPage();
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
  const firstLineParts = [title, artist, tags].filter((part) => part?.trim());
  firstLine.value = firstLineParts.join(" - ");

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

const requestFullscreen = () => {
  fullscreenService.requestFullscreen();
};

const scrollToTop = () => {
  divContainerRef.value?.scrollTo(0, 0);
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

const loadNextAndPrevious = () => {
  const playlistId = route.query.playlistId?.toString();
  if (!playlistId) return;
  const playlist = playlistRepository.getById(playlistId);
  if (!playlist) return;
  playlist.musicIds = playlist.musicIds ?? [];
  const musicId = route.params.id?.toString() ?? "";
  const index = playlist.musicIds.indexOf(musicId);
  if (index === -1) return;
  const nextIndex = index + 1;

  if (nextIndex < playlist.musicIds.length) {
    nextMusicId.value = playlist.musicIds[nextIndex];
  } else {
    nextMusicId.value = "";
  }

  const previousIndex = index - 1;

  if (previousIndex >= 0) {
    previousMusicId.value = playlist.musicIds[previousIndex];
  } else {
    previousMusicId.value = "";
  }
};

const edit = () => {
  const id = route.params.id?.toString() ?? "";
  router.push(`/editor/${ id }`);
};

const openTranspose = () => {
  transposeRef.value?.show();
};

const openSong = (id: string) => {
  if (!id) return;
  const url = `/render/${ id }`;
  const query = route.query;
  router.replace({ path: url, query });
};

const increaseFontSize = () => {
  chordsFontSize.value = Math.min(chordsFontSize.value + 2, 32);
};

const decreaseFontSize = () => {
  chordsFontSize.value = Math.max(chordsFontSize.value - 2, 12);
};

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (!touchStartX.value || !touchEndX.value) return;

  const distance = touchEndX.value - touchStartX.value;
  if (Math.abs(distance) < minSwipeDistance) return;

  if (distance > 0 && previousMusicId.value) {
    openSong(previousMusicId.value);
  } else if (distance < 0 && nextMusicId.value) {
    openSong(nextMusicId.value);
  }

  touchStartX.value = null;
  touchEndX.value = null;
};

onMounted(() => {
  loadMusic();
  listenTranspose();
  scrollToTop();
  loadNextAndPrevious();
})

onUnmounted(() => {
  onDestroyed$.next();
  onDestroyed$.complete();
})

watch(() => route.params.id, (newId) => {
  if (!(newId && newId !== id.value)) return;
  loadMusic();
  scrollToTop();
  loadNextAndPrevious();
});
</script>
