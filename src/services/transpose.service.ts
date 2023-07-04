import { Subject } from "rxjs";

class TransposeService {
  onTranspose$ = new Subject<boolean>();

  changeTranspose(isUp: boolean) {
    this.onTranspose$.next(isUp);
  }
}

export const transposeService = new TransposeService();
