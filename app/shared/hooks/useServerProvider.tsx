import "server-only";
import { cache } from "react";

const serverContext = cache(() => new Map());

export const useServerProvider = <T,>(key: string, defaultValue?: T) => {
  const global = serverContext();

  if (defaultValue !== undefined) {
    global.set(key, defaultValue);
  }

  return {
    get value() {
      return global.get(key);
    },
    set value(v: T) {
      global.set(key, v);
    },
  };
};
