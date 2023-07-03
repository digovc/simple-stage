<template>
  <div class="h-full flex flex-col place-content-center place-items-center space-y-4">
    <div>
      Home works!
    </div>
    <div>
      <PrimaryButton @click="router.push('/editor')">
        Editor
      </PrimaryButton>
    </div>
    <div>
      <Musics />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Musics from "@/pages/home/components/Musics.vue";

const router = useRouter()
</script>
