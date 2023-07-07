<template>
  <div ref="lineDivRef" class="whitespace-pre" @click="scrollDownToLine">
    {{ line.text }}
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ref } from "vue";
import type { RenderLineModel } from "@/models/render-line.model";

defineProps({
  line: {
    type: Object as PropType<RenderLineModel>,
    required: true
  }
})

const lineDivRef = ref<HTMLElement>() as any;

const scrollDownToLine = () => {
  lineDivRef.value.scrollIntoView({ behavior: "smooth" });
}
</script>
