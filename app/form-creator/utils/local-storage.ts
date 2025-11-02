// Safe localStorage helpers for SSR/SSG environments
// Note: Node.js 20+ has experimental localStorage but it may be incomplete
const hasLocalStorage = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (typeof localStorage === 'undefined') return false;
  if (typeof localStorage.getItem !== 'function') return false;
  return true;
};

export const getLocalStorageItem = (key: string): string | null => {
  if (!hasLocalStorage()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setLocalStorageItem = (key: string, value: string): void => {
  if (!hasLocalStorage()) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore errors in private browsing or storage-full scenarios
  }
};

export const removeLocalStorageItem = (key: string): void => {
  if (!hasLocalStorage()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
};
