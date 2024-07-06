import type { RecordBase } from "@/records/record-base";

export interface MusicRecord extends RecordBase {
  artist: string;
  content: string;
  fontSize: number;
  tags: string[];
  transpose: number;
}
