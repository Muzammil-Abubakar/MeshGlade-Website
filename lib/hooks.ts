"use client";

import { useSyncExternalStore } from "react";

const subscribeUrl = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};

/**
 * The current `location.search`, read safely on the client.
 * (Cache Components prerenders pages, so the server snapshot is always "".)
 */
export function useLocationSearch() {
  return useSyncExternalStore(
    subscribeUrl,
    () => window.location.search,
    () => "",
  );
}

export const STORAGE_EVENT = "mg-storage";

const subscribeStorage = (cb: () => void) => {
  window.addEventListener(STORAGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(STORAGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

/** Raw sessionStorage value (string snapshot, so it's referentially stable). */
export function useSessionItem(key: string) {
  return useSyncExternalStore(
    subscribeStorage,
    () => {
      try {
        return sessionStorage.getItem(key) ?? "";
      } catch {
        return "";
      }
    },
    () => "",
  );
}
