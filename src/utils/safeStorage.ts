export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch { return null; }
  },
  setItem(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {}
  },
  remove(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch {}
  }
};
  