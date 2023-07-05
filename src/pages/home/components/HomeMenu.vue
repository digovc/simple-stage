<template>
  <div>
    <div class="space-x-2">
      <PrimaryButton @click="router.push('/editor')">
        Create a song
      </PrimaryButton>
      <PrimaryButton @click="isPlaylistDialogOpen = true">
        Create a playlist
      </PrimaryButton>
      <SecundaryButton @click="exportAllData">
        Export all data
      </SecundaryButton>
      <DangerButton @click="importAllData">
        Import all data
      </DangerButton>
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
import DangerButton from "@/components/DangerButton.vue";

const router = useRouter()
const isPlaylistDialogOpen = ref(false)

const exportAllData = () => {
  const data = JSON.stringify(localStorage)
  const blob = new Blob([data], { type: 'text/plain' })
  const a = document.createElement('a')
  a.download = 'simple-stage-data.txt'
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':')
  a.click()
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
</script>
