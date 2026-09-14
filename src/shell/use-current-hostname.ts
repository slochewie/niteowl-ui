import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useCurrentHostname(fallbackHostname: string) {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hostname,
    () => fallbackHostname,
  );
}
