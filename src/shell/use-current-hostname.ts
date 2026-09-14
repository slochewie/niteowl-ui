import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useCurrentHostname() {
  return useSyncExternalStore<string | null>(
    subscribe,
    () => window.location.hostname,
    () => null,
  );
}
