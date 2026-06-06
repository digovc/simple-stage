<template>
  <div class="space-y-2 rounded-xl bg-white/[0.03] p-4">
    <div
      class="flex items-center gap-2 cursor-pointer select-none text-2xl"
      @click="isOpen = !isOpen"
    >
      <FontAwesomeIcon v-if="icon" :icon="icon" class="text-lg opacity-60"/>
      {{ title }}
      <span
        class="ml-auto transition-transform duration-200 text-base"
        :class="isOpen ? 'rotate-90' : ''"
      >▶</span>
    </div>
    <transition
      enter-active-class="transition-all duration-200 overflow-hidden"
      leave-active-class="transition-all duration-200 overflow-hidden"
      enter-from-class="opacity-0 -translate-y-1"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-show="isOpen" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
        <slot/>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import type { IconDefinition } from "@fortawesome/free-regular-svg-icons"

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: Object as () => IconDefinition,
    default: null
  },
  forceOpen: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)

watch(() => props.forceOpen, (val) => {
  if (val) isOpen.value = true
}, { immediate: true })
</script>
