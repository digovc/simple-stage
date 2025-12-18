import { Subject } from "rxjs";

class TransposeService {
  onTranspose$ = new Subject<number>();

  changeTranspose(semitones: number) {
    this.onTranspose$.next(semitones);
  }
}

export const transposeService = new TransposeService();
