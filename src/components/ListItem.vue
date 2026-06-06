<template>
  <div class="px-4 py-3 rounded-lg cursor-pointer text-sm transition-colors duration-150 bg-white/[0.06] hover:bg-white/[0.10] flex items-center gap-2">
    <FontAwesomeIcon v-if="icon" :icon="icon" class="opacity-50 text-xs"/>
    <slot/>
  </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import type { IconDefinition } from "@fortawesome/free-regular-svg-icons"

defineProps({
  icon: {
    type: Object as () => IconDefinition,
    default: null
  }
})
</script>
