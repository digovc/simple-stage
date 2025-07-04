<template>
  <div ref="divContainerRef" class="h-full font-mono relative" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <div class="h-full flex flex-col">
      <div class="font-semibold p-2 pb-0">
        {{ firstLine }}
      </div>
      <div class="pb-24 overflow-x-auto grow px-2">
        <template v-for="line in renderLines" :key="line.id">
          <ParagraphRender v-if="line.type === 'paragraph'" :line="line" :style="{ fontSize: `${chordsFontSize}px` }"/>
          <ChordsRender v-if="line.type === 'chords'" :line="line" :style="{ fontSize: `${chordsFontSize}px` }"/>
          <PhraseRender v-if="line.type === 'phrase'" :line="line" :style="{ fontSize: `${chordsFontSize}px` }"/>
        </template>
      </div>
    </div>
    <div class="fixed bottom-2 right-4 py-2 flex flex-col justify-end space-y-2 opacity-80 print:hidden">
      <IconButton :isDisabled="!previousMusicId" @click="openSong(previousMusicId)" :icon="faChevronLeft"/>
      <IconButton :isDisabled="!nextMusicId" @click="openSong(nextMusicId)" :icon="faChevronRight"/>
      <IconButton @click="increaseFontSize" :icon="faPlus"/>
      <IconButton @click="decreaseFontSize" :icon="faMinus"/>
      <IconButton @click="openTranspose" :icon="faMusic"/>
      <IconButton @click="edit" :icon="faPen"/>
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
import {
  faChevronLeft,
  faChevronRight,
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
const music = ref<MusicRecord>({} as MusicRecord);
const nextMusicId = ref<string>("");
const onDestroyed$ = new Subject<void>();
const previousMusicId = ref<string>("");
const renderLines = ref<RenderLineModel[]>([]);
const route = useRoute();
const router = useRouter();
const touchStartX = ref<number | null>(null);
const touchStartY = ref<number | null>(null);
const touchEndX = ref<number | null>(null);
const touchEndY = ref<number | null>(null);
const windowWidth = ref(window.innerWidth);
const transposeRef = ref<HTMLElement>() as any;

const backToPreviusPage = () => {
  router.back()
};

const detectIsChords = (line: string) => {
  if (line.trim() === '') {
    return false;
  }

  const trimmedLine = line.trim();
  const tokens = trimmedLine.split(/\s+/);

  if (tokens.length === 0) {
    return false;
  }

  const baseNote = '[A-G]';
  const accidental = '[#b]?';
  const extensions = '[a-z0-9\+]*';
  const coreChord = `${ baseNote }${ accidental }${ extensions }`;

  const slashChordPattern = `${ coreChord }\\/${ baseNote }${ accidental }`;
  const parenChordPattern = `\\(${ coreChord }\\)`;
  const hyphenChordPattern = `${ coreChord }(-${ coreChord })+`;

  const chordTokenRegex = new RegExp(`^(${parenChordPattern}|${hyphenChordPattern}|${slashChordPattern}|${coreChord})$`);

  return tokens.every(token => chordTokenRegex.test(token));
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
  chordsFontSize.value = music.value.fontSize ?? 16;
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
  saveFontSize();
};

const decreaseFontSize = () => {
  chordsFontSize.value = Math.max(chordsFontSize.value - 2, 12);
  saveFontSize();
};

const saveFontSize = () => {
  music.value.fontSize = chordsFontSize.value;
  musicRepository.save(music.value);
};

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX;
  touchEndY.value = e.touches[0].clientY;
};

const handleTouchEnd = () => {
  if (!touchStartX.value || !touchEndX.value || !touchStartY.value || !touchEndY.value) return;

  const deltaX = touchEndX.value - touchStartX.value;
  const deltaY = touchEndY.value - touchStartY.value;
  const horizontalDistance = Math.abs(deltaX);
  const verticalDistance = Math.abs(deltaY);

  const isHorizontalSwipe = horizontalDistance > verticalDistance;

  const isLongEnoughSwipe = horizontalDistance > windowWidth.value / 2;

  if (isHorizontalSwipe && isLongEnoughSwipe) {
    if (deltaX > 0 && previousMusicId.value) {
      openSong(previousMusicId.value);
    } else if (deltaX < 0 && nextMusicId.value) {
      openSong(nextMusicId.value);
    }
  }

  touchStartX.value = null;
  touchStartY.value = null;
  touchEndX.value = null;
  touchEndY.value = null;
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  loadMusic();
  listenTranspose();
  scrollToTop();
  loadNextAndPrevious();
  window.addEventListener('resize', updateWindowWidth);
})

onUnmounted(() => {
  onDestroyed$.next();
  onDestroyed$.complete();
  window.removeEventListener('resize', updateWindowWidth);
})

watch(() => route.params.id, (newId) => {
  if (!(newId && newId !== id.value)) return;
  loadMusic();
  scrollToTop();
  loadNextAndPrevious();
});
</script>
