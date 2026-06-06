<template>
  <DefaultButton :disabled="isDisabled">
    <div class="w-9 h-9 flex justify-center items-center rounded-lg transition-colors duration-200"
         :class="isDisabled ? 'opacity-30 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10'">
      <FontAwesomeIcon :icon="icon"/>
    </div>
  </DefaultButton>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DefaultButton from "@/components/DefaultButton.vue";
import type { PropType } from "vue";
import type { IconDefinition } from "@fortawesome/free-regular-svg-icons";

defineProps({
  icon: {
    type: Object as PropType<IconDefinition>,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>
