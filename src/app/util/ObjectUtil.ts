export function isNullOrUndefined(o: any): boolean {
  return o === null || o === undefined;
}

export function isNotNullOrUndefined(o: any): boolean {
  return !isNullOrUndefined(o);
}
