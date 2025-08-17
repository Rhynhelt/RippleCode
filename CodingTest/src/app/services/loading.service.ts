import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private count = 0;
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();

  private async emitAsync(value: boolean) {
    // to the next microtask to avoid "ExpressionChangedAfterItHasBeenCheckedError"
    await Promise.resolve();
    this._loading$.next(value);
  }

  start() {
    if (++this.count === 1) {
      this.emitAsync(true);
    }
  }

  stop() {
    if (this.count > 0 && --this.count === 0) {
      this.emitAsync(false);
    }
  }
}
