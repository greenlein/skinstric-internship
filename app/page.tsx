"use client";

import { useState } from "react";
import { ArrowLink } from "./components/ArrowLink";
import RotatingSquares from "./components/RotatingSquares";

const Home = () => {
  const [hoveredDirection, setHoveredDirection] = useState<"left" | "right" | null>(null);
  const isLeftLinkHidden = hoveredDirection === "right";
  const isRightLinkHidden = hoveredDirection === "left";

  return (
    <main className=" h-[calc(100vh-80px)] overflow-hidden bg-background font-sans text-text">
      <section className="flex-col relative flex h-full w-full items-center justify-center">
        <div
          aria-hidden={isLeftLinkHidden}
          inert={isLeftLinkHidden}
          className={`absolute left-6 top-1/2 z-10 -translate-y-1/2 transition-opacity duration-500 invisible lg:visible ${
            isLeftLinkHidden ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <ArrowLink
            direction="left"
            label="DISCOVER A.I."
            destination=""
            disabled
            showBox
            onMouseEnter={() => setHoveredDirection("left")}
            onMouseLeave={() => setHoveredDirection(null)}
          />
        </div>

        <div
          aria-hidden={isRightLinkHidden}
          inert={isRightLinkHidden}
          className={`absolute right-6 top-1/2 z-10 -translate-y-1/2 transition-opacity duration-500 invisible lg:visible ${
            isRightLinkHidden ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <ArrowLink
            direction="right"
            label="TAKE TEST"
            destination="introduction"
            navigationDelay={1100}
            showBox
            onMouseEnter={() => setHoveredDirection("right")}
            onMouseLeave={() => setHoveredDirection(null)}
          />
        </div>

        <h1 className="lg:absolute lg:left-6 lg:right-6 lg:top-1/2 lg:-translate-y-1/2 text-[40px] md:text-[clamp(4rem,8.2vw,8.4rem)] font-light leading-[0.88] tracking-[-0.075em]">
          <span
            className={`relative block w-max transition-all duration-1000 ${
              hoveredDirection === "right"
                ? "left-0 translate-x-0 text-start"
                : hoveredDirection === "left"
                  ? "left-full -translate-x-full text-end"
                  : "left-1/2 -translate-x-1/2 text-center"
            }`}
          >
            Sophisticated
          </span>
          <span
            className={`relative block w-max transition-all duration-1000 ${
              hoveredDirection === "right"
                ? "left-0 translate-x-0 text-start"
                : hoveredDirection === "left"
                  ? "left-full -translate-x-full text-end"
                  : "left-1/2 -translate-x-1/2 text-center"
            }`}
          >
            skincare
          </span>
        </h1>

        <p className="my-4 lg:absolute lg:bottom-8 lg:left-6 max-w-67.5 text-[9px] md:text-[11px] text-center uppercase leading-5 text-[#1A1B1C]">
          Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your skin needs.
        </p>

        <div className="visible lg:invisible z-1000">
          <ArrowLink label="ENTER EXPERIENCE" destination="introduction" direction="right" bold buttonSize="small" />
        </div>
        <div className="lg:invisible ">
          <RotatingSquares size={400} />
        </div>
      </section>
    </main>
  );
};

export default Home;
