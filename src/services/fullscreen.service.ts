class FullscreenService {
  async requestFullscreen() {
    const element = document.documentElement

    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        await element.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      }
    }
  }
}

export const fullscreenService = new FullscreenService();
