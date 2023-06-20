"use client";

import { createMachine } from "xstate";
import { createActorContext } from "@xstate/react";
import { LOCAL_STORAGE_KEY } from "@/constants/local-storage";
import React, { PropsWithChildren } from "react";

export const appMachine = createMachine({
  id: "app",
  predictableActionArguments: true,
  tsTypes: {} as import("./app.typegen").Typegen0,
  schema: {
    events: {} as { type: "GO_TO_STATE_1" } | { type: "GO_TO_STATE_2" },
  },
  on: {
    GO_TO_STATE_1: { target: `state1`, internal: false },
    GO_TO_STATE_2: { target: `state2`, internal: false },
  },
  states: {
    state1: {},
    state2: {},
  },
});

export const AppContext = createActorContext(appMachine, {}, (state) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
});

function getPersistentAppState() {
  if (typeof window !== "undefined") {
    return (
      JSON.parse(localStorage?.getItem(LOCAL_STORAGE_KEY) ?? "false") ||
      appMachine.initialState
    );
  }
}

export function AppProvider({ children }: PropsWithChildren<{}>) {
  return (
    <AppContext.Provider options={{ state: getPersistentAppState() }}>
      {children}
    </AppContext.Provider>
  );
}
