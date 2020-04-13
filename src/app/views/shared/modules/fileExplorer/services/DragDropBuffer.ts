export class DragDropBuffer {
  private value: any = null;

  add(value: any) {
    this.value = value;
  }

  get() {
    const buffer = this.value;
    this.value = null;
    return buffer;
  }

  clear() {
    this.value = null;
  }
}
