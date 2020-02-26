export class TabSession {
  private openTabs = [];
  private selected = null;

  has(fileId: string): boolean {
    return this.openTabs.includes(fileId);
  }

  remove(fileId: string): void {
    const index = this.openTabs.indexOf(fileId);

    if (index >= 0) this.openTabs.splice(index, 1);
  }

  add(fileId): void {
    if (!this.has(fileId)) {
      this.openTabs.push(fileId);
    }
  }

  get(fileId) {
    const index = this.openTabs.indexOf(fileId);

    return this.openTabs[index];
  }

  getSelected(): string {
    return this.selected;
  }

  setSelected(id: string): void {
    this.selected = id;
  }

  clearSelected(): void {
    this.selected = null;
  }

  first() {
    return this.openTabs[0];
  }

  clear(): void {
    this.openTabs = [];
    this.clearSelected();
  }
}
