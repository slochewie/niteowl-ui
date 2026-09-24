import { useCallback, useEffect, useState } from "react";

const SIDEBAR_STORAGE_KEY = "niteowl.sidebar.open";
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readPersistedSidebarState(defaultOpen: boolean) {
  if (typeof window === "undefined") return defaultOpen;

  const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
  if (stored === "true") return true;
  if (stored === "false") return false;

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

  window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
  document.cookie =
    `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`;
}

export function useNiteOwlSidebarState(defaultOpen = true) {
  const [open, setOpenState] = useState(() =>
    readPersistedSidebarState(defaultOpen),
  );
  const [hydrated, setHydrated] = useState(typeof window !== "undefined");

  useEffect(() => {
    const persistedOpen = readPersistedSidebarState(defaultOpen);
    setOpenState(persistedOpen);
    setHydrated(true);
  }, [defaultOpen]);

  const setOpen = useCallback((nextOpen: boolean) => {
    setOpenState(nextOpen);
    persistSidebarState(nextOpen);
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
