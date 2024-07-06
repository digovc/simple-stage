<template>
  <div>
    <div class="h-px border border-dashed border-gray-400 mr-16 mt-4"></div>
    <div ref="paragraphDivRef" class="font-semibold whitespace-pre" @click="scrollDown">
      {{ line.text?.trim() }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import type { RenderLineModel } from "@/models/render-line.model";
import { ref } from "vue";

defineProps({
  line: {
    type: Object as PropType<RenderLineModel>,
    required: true
  }
})

const paragraphDivRef = ref<HTMLElement>() as any;

const scrollDown = () => {
  paragraphDivRef.value.scrollIntoView({ behavior: "smooth" });
}
</script>
