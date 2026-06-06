<template>
  <div class="flex">
    <div class="rounded-full py-2 px-5 inline-flex items-center gap-2 w-96 bg-white/[0.06] focus-within:bg-white/[0.09] transition-colors duration-150">
      <svg class="w-4 h-4 opacity-40 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3" stroke-linecap="round"/>
      </svg>
      <input type="text" placeholder="Search" class="w-full outline-none bg-transparent text-white placeholder-white/30 text-sm" v-model="query"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

const query = ref("");
const emits = defineEmits(["onSearch"]);

watch(query, (value) => {
  const clearedQuery = value?.trim().toLowerCase();
  emits("onSearch", clearedQuery);
});

</script>
