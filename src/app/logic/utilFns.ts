export function getMaxPosition(components: any[]): number {
  let max: number = 0;
  for (const c of components) {
    if (c.value.position > max) {
      max = c.value.position;
    }
  }

  return max;
}

export function addPosition(component, components: any[]) {
  const max: number = getMaxPosition(components);

  component.value.position = max + 1;

  return component;
}
