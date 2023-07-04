import type { MusicRecord } from "@/records/music.record";
import { RepositoryBase } from "@/services/repository-base";

class MusicRepository extends RepositoryBase<MusicRecord> {
  protected getTableName(): string {
    return "music";
  }
}

export const musicRepository = new MusicRepository();
