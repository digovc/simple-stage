<template>
  <div class="whitespace-pre">
    {{ line.text }}
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
