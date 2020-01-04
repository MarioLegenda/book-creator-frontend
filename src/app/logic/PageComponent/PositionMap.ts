import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export default class PositionMap {
    private map: {[key: number]: number} = {};

    bulkAdd(positions: number[]): void {
        for (const p of positions) {
            this.add(p);
        }
    }

    add(position: number): void {
        const idx: number = this.next();

        this.map[idx] = position;
    }

    remove(position): void {
        const index: number = this.getIndex(position);

        delete this.map[index];

        this.resetIndexes();
    }

    getIndex(position: number): number|null {
        const keys = Object.keys(this.map);
        for (const key of keys) {
            if (this.map[key] === position) {
                return parseInt(key);
             }
        }

        return null;
    }

    getPosition(index: number): number {
        return this.map[index];
    }

    next(): number {
        const keys = Object.keys(this.map);

        if (keys.length === 0) return 0;

        return keys.length;
    }

    reset(): void {
        this.map = {};
    }

    private resetIndexes(): void {
        const values = Object.values(this.map);
        this.map = {};

        this.bulkAdd(values);
    }
}
