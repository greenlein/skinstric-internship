import { configureStore } from "@reduxjs/toolkit";
import demographicsReducer, { initialState as defaultDemographics } from "./demographics";

const STORAGE_KEY = "skinstric-demographics";

const preserveSavedOrder = <T extends Record<string, number>>(saved: Partial<T> | undefined, defaults: T): T => {
  const orderedEntries = Object.entries(saved ?? {}).filter(([key]) => key in defaults) as [string, number][];
  const missingEntries = Object.entries(defaults).filter(([key]) => !(key in (saved ?? {}))) as [string, number][];

  return Object.fromEntries([...orderedEntries, ...missingEntries]) as T;
};

export const loadDemographics = () => {
  if (typeof window === "undefined") {
    return defaultDemographics;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultDemographics;
    }

    const parsed = JSON.parse(saved);

    return {
      race: preserveSavedOrder(parsed?.race, defaultDemographics.race),
      age: preserveSavedOrder(parsed?.age, defaultDemographics.age),
      gender: preserveSavedOrder(parsed?.gender, defaultDemographics.gender),
    };
  } catch {
    return defaultDemographics;
  }
};

export const store = configureStore({
  reducer: {
    demographics: demographicsReducer,
  },
  preloadedState: {
    demographics: defaultDemographics,
  },
});

store.subscribe(() => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().demographics));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
