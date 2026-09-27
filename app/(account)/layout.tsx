"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { ArrowLink } from "../components/ArrowLink";
import { store, loadDemographics } from "../redux/store";
import { setDemographic } from "../redux/demographics";

export default function layout({ children }: LayoutProps<"/">) {
  useEffect(() => {
    store.dispatch(setDemographic({ data: loadDemographics() } as any));
  }, []);

  return (
    <Provider store={store}>
      <main className="relative h-[calc(100vh-64px)] overflow-y-auto lg:overflow-hidden bg-[#fafafa] text-[#1f1f1f] flex flex-col items-center justify-start lg:justify-center">
        <p className="absolute left-4 top-4 text-[12px] font-semibold tracking-[-0.03em]">
          A.I. ANALYSIS
        </p>

        {children}
      </main>
    </Provider>
  );
}
