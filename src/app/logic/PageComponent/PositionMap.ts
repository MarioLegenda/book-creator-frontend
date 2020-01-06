import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class PositionMap {
  private max: number = 0;

  setMax(max: number): void {
    this.max = max;
  }

  next(): number {
    this.max = this.max + 1;

    return this.max;
  }
}
