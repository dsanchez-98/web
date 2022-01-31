export function idx<T>(f: () => T, defaultValue?: T | string) {
  try {
    const res = f();
    return res === null || res === undefined ? defaultValue : res;
  } catch (e) {
    return defaultValue;
  }
}
