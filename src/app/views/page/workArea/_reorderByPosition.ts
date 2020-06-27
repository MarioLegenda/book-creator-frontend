export function _reorderByPosition(positionMap: any) {
  for (const map of positionMap) {
    const idx: number = this.components.findIndex(c => c.blockUuid === map.uuid);

    this.components[idx].position = map.position;
  }
}
