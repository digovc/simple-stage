import type { RecordBase } from "@/records/record-base";

export interface PlaylistRecord extends RecordBase {
  tags: string[];
  musicIds: string[];
}
