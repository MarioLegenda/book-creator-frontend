export function titleResolver(title: string, max: number) {
  if (title.length >= max) {
    return `${title.substring(0, max)}...`;
  } else {
    return title;
  }
}
