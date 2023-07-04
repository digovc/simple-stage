import { RepositoryBase } from "@/services/repository-base";
import type { PlaylistRecord } from "@/records/playlist.record";

class PlaylistRepository extends RepositoryBase<PlaylistRecord> {
  protected getTableName(): string {
    return "playlist";
  }
}

export const playlistRepository = new PlaylistRepository();
