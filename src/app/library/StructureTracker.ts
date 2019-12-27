import Util from "./Util";

export default class StructureTracker {
  private structure = {};

  hasStructure(key: string): boolean {
    return Util.hasKey(this.structure, key);
  }

  createStructure(key: string): void {
    this.structure[key] = [];
  }

  clearStructure(key: string): void {
    delete this.structure[key];
  }

  addToStructure(key: string, structure: any[]): void {
    this.structure[key] = [...this.structure[key], ...structure];
  }

  getStructure(key: string) {
    return this.structure[key];
  }

  addToStructureItem(key: string, id: string): void {
    this.structure[key].push(id);
  }
}
