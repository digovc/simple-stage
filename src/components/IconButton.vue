<template>
  <DefaultButton :disabled="isDisabled">
    <div class="w-9 h-9 flex justify-center items-center rounded hover:bg-gray-700 border border-gray-300"
         :class="{ 'opacity-50 cursor-not-allowed': isDisabled }">
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
