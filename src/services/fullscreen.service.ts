class FullscreenService {
  async requestFullscreen() {
    const element = document.documentElement

    if (element.requestFullscreen) {
      await element.requestFullscreen()
    }
  }
}

export const fullscreenService = new FullscreenService();
