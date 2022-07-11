export function parseToJson(tokenMetadata: string) {
  const json = atob(tokenMetadata.substring(29));
  return JSON.parse(json);
}
