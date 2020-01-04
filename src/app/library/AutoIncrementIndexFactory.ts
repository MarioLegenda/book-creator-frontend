import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AutoIncrementIndexFactory {
  private start = 1;
  private lastIndex: number|null = null;
  private currentIndex: number|null = null;

  update(currentIndex: number): number {
    this.start = currentIndex;
    this.lastIndex = currentIndex;
    this.currentIndex = currentIndex;

    return this.currentIndex;
  }

  increment(): number {
    if (this.currentIndex !== null && this.lastIndex !== null) {
      const previous = this.currentIndex;
      const next = this.currentIndex + 1;

      this.lastIndex = previous;
      this.currentIndex = next;

      return this.currentIndex;
    }

    if (this.start === 0) {
      this.lastIndex = this.start;
      this.currentIndex = this.start;

      return this.start;
    }

    this.lastIndex = this.currentIndex;
    this.currentIndex = this.currentIndex + 1;

    return this.currentIndex;
  }

  reset() {
    this.start = 0;
    this.lastIndex = null;
    this.currentIndex = null;
  }
}
