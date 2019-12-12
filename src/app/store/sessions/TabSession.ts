export class TabSession {
  openTabs = [];

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

  clear(): void {
    this.openTabs = [];
  }
}
