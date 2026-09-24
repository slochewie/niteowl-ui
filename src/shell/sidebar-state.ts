import { useCallback, useSyncExternalStore } from "react";

const SIDEBAR_STORAGE_KEY = "niteowl.sidebar.open";
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const SIDEBAR_EVENT = "niteowl:sidebar-state";

function readPersistedSidebarState(defaultOpen: boolean) {
  if (typeof window === "undefined") return defaultOpen;

  try {
    const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {
    // Fall back to the cookie below when storage is unavailable.
  }

  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
    ?.split("=")[1];

  if (cookieValue === "true") return true;
  if (cookieValue === "false") return false;

  return defaultOpen;
}

function persistSidebarState(open: boolean) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
  } catch {
    // Cookie persistence still works if localStorage is unavailable.
  }

  document.cookie =
    `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`;

  window.dispatchEvent(new Event(SIDEBAR_EVENT));
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === SIDEBAR_STORAGE_KEY) callback();
  };

  window.addEventListener(SIDEBAR_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(SIDEBAR_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useNiteOwlSidebarState(defaultOpen = true) {
  const open = useSyncExternalStore(
    subscribe,
    () => readPersistedSidebarState(defaultOpen),
    () => defaultOpen,
  );

  const setOpen = useCallback((nextOpen: boolean) => {
    persistSidebarState(nextOpen);
  }, []);

  const toggle = useCallback(() => {
    persistSidebarState(!readPersistedSidebarState(defaultOpen));
  }, [defaultOpen]);

  return {
    open,
    setOpen,
    toggle,
    hydrated: typeof window !== "undefined",
  };
}
