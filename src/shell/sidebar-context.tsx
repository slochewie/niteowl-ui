import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type NiteOwlSidebarContextValue = {
  open: boolean;
  hydrated: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  toggleSidebar: () => void;
};

const NiteOwlSidebarContext = createContext<NiteOwlSidebarContextValue | null>(
  null,
);

function readSidebarCookie(defaultOpen: boolean) {
  if (typeof document === "undefined") return defaultOpen;

  const sidebarState = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
    ?.split("=")[1];

  return sidebarState !== "false";
}

export function NiteOwlSidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpenState] = useState(defaultOpen);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOpenState(readSidebarCookie(defaultOpen));
    setHydrated(true);
  }, [defaultOpen]);

  const setOpen = useCallback(
    (value: boolean | ((open: boolean) => boolean)) => {
      const nextOpen = typeof value === "function" ? value(open) : value;

      setOpenState(nextOpen);
      document.cookie =
        `${SIDEBAR_COOKIE_NAME}=${nextOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [open],
  );

  const toggleSidebar = useCallback(() => {
    setOpen((currentOpen) => !currentOpen);
  }, [setOpen]);

  const value = useMemo(
    () => ({ open, hydrated, setOpen, toggleSidebar }),
    [open, hydrated, setOpen, toggleSidebar],
  );

  return (
    <NiteOwlSidebarContext.Provider value={value}>
      {children}
    </NiteOwlSidebarContext.Provider>
  );
}

export function useNiteOwlSidebar() {
  const context = useContext(NiteOwlSidebarContext);

  if (!context) {
    throw new Error(
      "useNiteOwlSidebar must be used within NiteOwlSidebarProvider",
    );
  }

  return context;
}
