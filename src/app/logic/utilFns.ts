export function getMaxPosition(components: any[]): number {
  let max: number = 0;
  for (const c of components) {
    if (c.position > max) {
      max = c.position;
    }
  }

  return max;
}

export function addPosition(component, components: any[]) {
  const max: number = getMaxPosition(components);

  component.position = max + 1;

  return component;
}
