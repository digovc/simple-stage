import type { RecordBase } from "@/records/record-base";

export interface PlaylistRecord extends RecordBase {
  title: string;
  tags: string[];
  musicIds: string[];
}
