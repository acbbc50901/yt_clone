"use client";

import { Provider } from "react-redux";
import { store } from "@/redex/store";

export function RedexProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
