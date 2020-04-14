import {IBufferValue} from "../models/BufferValue";

export class CopyBuffer {
  private values: IBufferValue[] = [];

  add(value: IBufferValue) {
    if (!this.has(value)) {
      this.values.push(value);
    }
  }

  get(): IBufferValue[] {
    const buffer = this.values;
    this.values = [];
    return buffer;
  }

  clear() {
    this.values = [];
  }

  private has(value: IBufferValue): boolean {
    const idx: number = this.values.findIndex((a) => {
      return a.id === value.id;
    });

    return (idx !== -1);
  }
}
