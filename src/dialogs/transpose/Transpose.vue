<template>
  <div>
    <Dialog v-if="isVisible" @onClose="isVisible = false">
      <div class="space-y-4">
        <div class="text-2xl text-center">
          Transpose
        </div>

        <div class="flex items-center justify-between space-x-2">
          <!-- Left Notes -->
          <div class="flex space-x-1">
            <button
              v-for="note in leftNotes"
              :key="note"
              class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center text-xs"
              @click="selectNote(note)"
            >
              {{ note }}
            </button>
          </div>

          <!-- Center (Current) Note -->
          <div class="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg shadow-lg ring-4 ring-primary/30">
            {{ currentNoteDisplay }}
          </div>

          <!-- Right Notes -->
          <div class="flex space-x-1">
            <button
              v-for="note in rightNotes"
              :key="note"
              class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center text-xs"
              @click="selectNote(note)"
            >
              {{ note }}
            </button>
          </div>
        </div>

        <div class="flex justify-between space-x-4">
          <IconButton @click="changeTranspose(-1)" :icon="faMinus">
          </IconButton>
          <IconButton @click="changeTranspose(1)" :icon="faPlus">
          </IconButton>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { computed, ref } from "vue";
import { transposeService } from "@/services/transpose.service";
import IconButton from "@/components/IconButton.vue";
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as ChordTransposer from 'chord-transposer';

const isVisible = ref<boolean>(false);
const currentKey = ref<string>('C');

const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const currentNoteDisplay = computed(() => {
  // Try to simplify the chord to just the root note
  try {
    const chord = ChordTransposer.Chord.parse(currentKey.value);
    if (chord) {
      return chord.root;
    }
  } catch (e) {
    // ignore
  }
  return currentKey.value;
});

const getRootNote = (note: string): string => {
   try {
    const chord = ChordTransposer.Chord.parse(note);
    if (chord) {
      return chord.root;
    }
  } catch (e) {
    // ignore
  }
  return note;
}

const leftNotes = computed(() => {
  const root = getRootNote(currentKey.value);
  // Find index in scale (handle flat/sharp equivalence if possible, but for now simple matching)
  // For simplicity, we can normalize everything to sharps for the grid.
  const index = getNoteIndex(root);
  if (index === -1) return []; // Should not happen if valid

  const notes = [];
  for (let i = 1; i <= 3; i++) {
    let newIndex = index - i;
    if (newIndex < 0) newIndex += 12;
    notes.unshift(CHROMATIC_SCALE[newIndex]);
  }
  return notes;
});

const rightNotes = computed(() => {
  const root = getRootNote(currentKey.value);
  const index = getNoteIndex(root);
  if (index === -1) return [];

  const notes = [];
  for (let i = 1; i <= 3; i++) {
    let newIndex = index + i;
    if (newIndex >= 12) newIndex -= 12;
    notes.push(CHROMATIC_SCALE[newIndex]);
  }
  return notes;
});

const getNoteIndex = (note: string): number => {
  // Normalize flats to sharps
  const normalized = normalizeNote(note);
  return CHROMATIC_SCALE.indexOf(normalized);
}

const normalizeNote = (note: string): string => {
  const map: Record<string, string> = {
    'Cb': 'B',
    'Db': 'C#',
    'Eb': 'D#',
    'Fb': 'E',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#',
    'E#': 'F',
    'B#': 'C',
  };
  return map[note] || note;
}


const changeTranspose = (semitones: number) => {
  transposeService.changeTranspose(semitones);

  // Update local key
  try {
    if (semitones > 0) {
      currentKey.value = ChordTransposer.transpose(currentKey.value).up(semitones).toString();
    } else {
      currentKey.value = ChordTransposer.transpose(currentKey.value).down(Math.abs(semitones)).toString();
    }
  } catch (e) {
    console.error("Failed to transpose local key", e);
  }
};

const selectNote = (targetNote: string) => {
  const currentRoot = getRootNote(currentKey.value);
  const currentIndex = getNoteIndex(currentRoot);
  const targetIndex = getNoteIndex(targetNote);

  if (currentIndex === -1 || targetIndex === -1) return;

  let diff = targetIndex - currentIndex;

  // We want the shortest path, maybe?
  // But wait, pitch matters. If I click the note to the right, I expect it to go up.
  // The list is displayed as ... left(-3) left(-2) left(-1) CENTER right(+1) right(+2) right(+3) ...

  // So we should calculate difference based on the visual position if it was a circle.
  // Actually, standard behavior is usually shortest path or just strict modulo.
  // However, since we show neighbors, we can deduce direction.

  // If target is in rightNotes, diff should be positive.
  // If target is in leftNotes, diff should be negative.

  // Let's re-calculate to ensure it matches the visual representation
  if (rightNotes.value.includes(targetNote)) {
     if (diff < 0) diff += 12; // Wrap around forward
  } else if (leftNotes.value.includes(targetNote)) {
     if (diff > 0) diff -= 12; // Wrap around backward
  }

  // Edge case: if it's strictly half way (6 semitones), sign is ambiguous but +6 is usually fine.

  changeTranspose(diff);
}

const show = (key: string) => {
  if (key) {
    currentKey.value = key;
  }
  isVisible.value = true;
};

defineExpose({
  show
})
</script>

<style scoped>
.bg-primary {
  @apply bg-blue-500; /* Adjust color as needed */
}
</style>
