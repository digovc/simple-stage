import type { RecordBase } from "@/records/record-base";
import { v4 as uuid } from "uuid";
import { Subject } from "rxjs";

export abstract class RepositoryBase<TRecord extends RecordBase> {
  onCreated$ = new Subject<TRecord>();
  onUpdated$ = new Subject<TRecord>();

  delete(id: any) {
    if (!id) return;
    const table = this.getTableName();
    const idsJson = localStorage.getItem(`${ table }-ids`) ?? "[]";
    const ids = JSON.parse(idsJson);
    const index = ids.indexOf(id);
    if (index === -1) return;
    ids.splice(index, 1);
    localStorage.removeItem(id);
  }

  getAll() {
    const table = this.getTableName();
    const idsJson = localStorage.getItem(`${ table }-ids`) ?? "[]";
    const ids = JSON.parse(idsJson) ?? [];
    const records = [] as TRecord[];

    for (const id of ids) {
      const recordJson = localStorage.getItem(id);

      if (recordJson) {
        records.push(JSON.parse(recordJson));
      }
    }

    return records.sort((a, b) => a.title.localeCompare(b.title));
  }

  getById(id: string): TRecord | null {
    if (!id) return null;
    const recordJson = localStorage.getItem(id);
    if (!recordJson) return null;
    return JSON.parse(recordJson);
  }

  save(record: TRecord) {
    const table = this.getTableName();
    const newId = `${ table }-${ uuid() }`;
    const id = record.id || newId;
    record.id = id;
    localStorage.setItem(id, JSON.stringify(record));
    const idsJson = localStorage.getItem(`${ table }-ids`) ?? "[]";
    const ids = JSON.parse(idsJson);
    if (ids.includes(id)) return;
    ids.push(id);
    localStorage.setItem(`${ table }-ids`, JSON.stringify(ids));

    if (newId === id) {
      this.onCreated$.next(record);
    } else {
      this.onUpdated$.next(record);
    }
  }

  protected abstract getTableName(): string;
}
