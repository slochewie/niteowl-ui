import { useCallback, useEffect, useState } from "react";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function readSidebarCookie(defaultOpen: boolean) {
  if (typeof document === "undefined") return defaultOpen;

  const sidebarState = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
    ?.split("=")[1];

  if (sidebarState === "true") return true;
  if (sidebarState === "false") return false;

  return defaultOpen;
}

function writeSidebarCookie(open: boolean) {
  if (typeof document === "undefined") return;

  document.cookie =
    `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
}

export function useNiteOwlSidebarState(defaultOpen = true) {
  const [open, setOpenState] = useState(defaultOpen);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOpenState(readSidebarCookie(defaultOpen));
    setHydrated(true);
  }, [defaultOpen]);

  const setOpen = useCallback((nextOpen: boolean) => {
    writeSidebarCookie(nextOpen);
    setOpenState(nextOpen);
  }, []);

  const toggle = useCallback(() => {
    const nextOpen = !open;
    writeSidebarCookie(nextOpen);
    setOpenState(nextOpen);
  }, [open]);

  return {
    open,
    setOpen,
    toggle,
    hydrated,
  };
}
