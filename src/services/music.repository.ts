import type { MusicModel } from "@/models/music.model";
import { v4 as uuid } from "uuid";

class MusicRepository {
  getAll() {
    const musicIdsJson = localStorage.getItem("musicIds") ?? "[]";
    const musicIds = JSON.parse(musicIdsJson);
    const musicList: MusicModel[] = [];

    for (const musicId of musicIds) {
      const music = localStorage.getItem(musicId);

      if (music) {
        musicList.push(JSON.parse(music));
      }
    }

    return musicList;
  }

  getById(id: string): MusicModel | null {
    const music = localStorage.getItem(id);
    if (!music) return null;
    return JSON.parse(music);
  }

  save(music: MusicModel) {
    const newId = `music-${ uuid() }`;
    const id = music.id || newId;
    music.id = id;
    localStorage.setItem(id, JSON.stringify(music));
    const musicIdsJson = localStorage.getItem("musicIds") ?? "[]";
    const musicIds = JSON.parse(musicIdsJson);

    if (!musicIds.includes(id)) {
      musicIds.push(id);
      localStorage.setItem("musicIds", JSON.stringify(musicIds));
    }
  }
}

export const musicRepository = new MusicRepository();
