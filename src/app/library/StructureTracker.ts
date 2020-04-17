import Util from "./Util";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class StructureTracker {
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

  addItemToStructure(key: string, id: string): void {
    this.structure[key].push(id);
  }

  getStructureLen(key: string): number {
    if (!this.hasStructure(key)) return 0;

    return this.getStructure(key).length;
  }

  removeItemFromStructure(key: string, item: string): void {
    if (!this.hasStructure(key)) return;

    const st = this.getStructure(key);

    const idx: number = st.findIndex(val => val === item);

    if (idx === -1) return;

    st.splice(idx, 1);
  }

  clearAll(): void {
    this.structure = [];
  }
}
