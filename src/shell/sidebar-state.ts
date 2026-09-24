import { useCallback, useEffect, useState } from "react";

const SIDEBAR_STORAGE_KEY = "niteowl.sidebar.open";
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

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
}

export function useNiteOwlSidebarState(defaultOpen = true) {
  const [open, setOpenState] = useState(defaultOpen);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOpenState(readPersistedSidebarState(defaultOpen));
    setHydrated(true);
  }, [defaultOpen]);

  const setOpen = useCallback((nextOpen: boolean) => {
    persistSidebarState(nextOpen);
    setOpenState(nextOpen);
  }, []);

  const toggle = useCallback(() => {
    setOpenState((currentOpen) => {
      const nextOpen = !currentOpen;
      persistSidebarState(nextOpen);
      return nextOpen;
    });
  }, []);

  return {
    open,
    setOpen,
    toggle,
    hydrated,
  };
}
