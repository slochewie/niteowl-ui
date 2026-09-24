import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type NiteOwlSidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  toggleSidebar: () => void;
};

const NiteOwlSidebarContext = createContext<NiteOwlSidebarContextValue | null>(
  null,
);

export function NiteOwlSidebarProvider({
  children,
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = useCallback(
    (value: boolean | ((open: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;

      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      document.cookie =
        `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [open, setOpenProp],
  );

  const toggleSidebar = useCallback(() => {
    setOpen((currentOpen) => !currentOpen);
  }, [setOpen]);

  const state = open ? "expanded" : "collapsed";

  const value = useMemo(
    () => ({ state, open, setOpen, toggleSidebar }),
    [state, open, setOpen, toggleSidebar],
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
