import type { RecordBase } from "@/records/record-base";

export interface MusicRecord extends RecordBase {
  title: string;
  artist: string;
  tags: string[];
  content: string;
  transpose: number;
}
