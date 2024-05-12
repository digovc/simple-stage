<template>
  <div class="flex">
    <div class="border rounded-full py-2 px-4 inline w-96 focus-within:shadow bg-gray-600">
      <input type="text" placeholder="Search" class="w-full outline-none bg-gray-600" v-model="query"/>
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
