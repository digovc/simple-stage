<template>
  <div v-if="visible" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black opacity-20" @click="cancel"/>
    <div class="flex place-content-center place-items-center h-full p-4">
      <div class="rounded-lg bg-gray-800 z-10 p-6 w-80 space-y-4">
        <h3 class="text-white text-lg font-semibold">
          {{ title }}
        </h3>
        <p v-if="message" class="text-gray-400 text-sm">
          {{ message }}
        </p>
        <div class="flex justify-end gap-2 pt-2">
          <DefaultButton>
            <div
              class="bg-white/5 hover:bg-white/10 text-gray-300 p-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              @click="cancel"
            >
              Cancelar
            </div>
          </DefaultButton>
          <DefaultButton>
            <div
              class="bg-red-500/10 text-red-400 hover:bg-red-500/20 p-2 px-4 rounded-lg transition-colors duration-200 text-sm"
              @click="confirm"
            >
              Confirmar
            </div>
          </DefaultButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultButton from "@/components/DefaultButton.vue";

defineProps<{
  title: string
  message?: string
  visible: boolean
}>()

const emit = defineEmits<{
  onConfirm: []
  onCancel: []
}>()

const confirm = () => emit('onConfirm')
const cancel = () => emit('onCancel')
</script>
