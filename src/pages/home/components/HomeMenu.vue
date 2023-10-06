<template>
  <div>
    <div class="space-x-2 overflow-x-auto whitespace-nowrap pb-2">
      <PrimaryButton @click="router.push('/editor')">
        + Song
      </PrimaryButton>
      <PrimaryButton @click="isPlaylistDialogOpen = true">
        + Playlist
      </PrimaryButton>
      <SecundaryButton @click="exportAllData">
        Export
      </SecundaryButton>
      <SecundaryButton @click="importAllData">
        Import
      </SecundaryButton>
      <SecundaryButton @click="requestFullscreen">
        Fullscreen
      </SecundaryButton>
    </div>

    <div>
      <PlaylistForm v-if="isPlaylistDialogOpen" @onClose="isPlaylistDialogOpen = false"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from "@/components/PrimaryButton.vue";
import { useRouter } from "vue-router";
import PlaylistForm from "@/dialogs/playlist/PlaylistForm.vue";
import { ref } from "vue";
import SecundaryButton from "@/components/SecundaryButton.vue";
import { fullscreenService } from "@/services/fullscreen.service";

const router = useRouter()
const isPlaylistDialogOpen = ref(false)

const exportAllData = () => {
  const data = JSON.stringify(localStorage);
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.download = 'simple-stage-data.txt';
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
  a.style.display = 'none';

  document.body.appendChild(a);

  const event = new MouseEvent('click');
  a.dispatchEvent(event);

  document.body.removeChild(a);
}

const importAllData = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'text/plain'
  input.onchange = () => {
    const file = input.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result as string
      const parsedData = JSON.parse(data)
      Object.keys(parsedData).forEach(key => {
        localStorage.setItem(key, parsedData[key])
      })
      window.location.reload()
    }
    reader.readAsText(file)
  }
  input.click()
}

const requestFullscreen = async () => {
  await fullscreenService.requestFullscreen()
}
</script>
