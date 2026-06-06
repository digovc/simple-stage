import { ref } from 'vue'

interface ConfirmOptions {
  title: string
  message?: string
}

export function useConfirm() {
  const visible = ref(false)
  const title = ref('')
  const message = ref<string | undefined>('')

  let resolveFn: ((value: boolean) => void) | null = null

  const ask = (options: ConfirmOptions): Promise<boolean> => {
    title.value = options.title
    message.value = options.message
    visible.value = true
    return new Promise((resolve) => {
      resolveFn = resolve
    })
  }

  const onConfirm = () => {
    visible.value = false
    resolveFn?.(true)
    resolveFn = null
  }

  const onCancel = () => {
    visible.value = false
    resolveFn?.(false)
    resolveFn = null
  }

  return {
    visible,
    title,
    message,
    ask,
    onConfirm,
    onCancel,
  }
}
