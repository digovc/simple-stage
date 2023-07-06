<template>
  <div class="font-semibold whitespace-pre border-b mt-4 pb-1">
    {{ line.text?.trim() }}
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import type { RenderLineModel } from "@/models/render-line.model";

defineProps({
  line: {
    type: Object as PropType<RenderLineModel>,
    required: true
  }
})
</script>
