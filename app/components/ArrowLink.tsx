"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ArrowLinkProps = {
  label: string;
  direction: "left" | "right";
  color?: "black" | "white";
  destination?: string;
  navigationDelay?: number;
  disabled?: boolean;
  showBox?: boolean;
  bold?: boolean;
  buttonSize?: "small" | "default";
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const ArrowLinkBox = ({ direction, isPinging }: { direction: "left" | "right"; isPinging: boolean }) => (
  <>
    <div
      className={`pointer-events-none absolute ${
        direction === "left" ? "left-[-325px]" : "right-[-325px]"
      } top-1/2 h-[602px] w-[602px] -translate-y-1/2 rotate-45 border border-dashed border-[#c1c5c6]`}
    />

    {isPinging && (
      <div
        className={`pointer-events-none absolute ${
          direction === "left" ? "left-[-325px]" : "right-[-325px]"
        } top-1/2 h-[602px] w-[602px] -translate-y-1/2 rotate-45 border border-dashed border-[#c1c5c6] animate-ping [animation-duration:2s]`}
      />
    )}
  </>
);

export const ArrowLink = ({
  label,
  direction,
  color = "black",
  showBox = false,
  bold = false,
  buttonSize = "default",
  destination,
  navigationDelay = 0,
  disabled = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ArrowLinkProps) => {
  const [isPinging, setIsPinging] = useState(false);
  const router = useRouter();

  return (
    <>
      {showBox && <ArrowLinkBox direction={direction} isPinging={isPinging} />}
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onMouseEnter={disabled ? undefined : onMouseEnter}
        onMouseLeave={disabled ? undefined : onMouseLeave}
        onClick={() => {
          if (disabled) return;

          setIsPinging(true);
          window.setTimeout(() => setIsPinging(false), 2000);
          if (onClick) {
            onClick();
          } else if (destination) {
            window.setTimeout(() => router.push(`/${destination}`), navigationDelay);
          }
        }}
        className={`group flex items-center gap-4 text-[10px] ${
          bold ? "font-bold" : "font-medium"
        } ${color === "white" ? "text-white" : "text-text"} ${
          direction === "right" ? "flex-row-reverse" : ""
        } ${disabled ? "cursor-not-allowed" : ""}`}
      >
        <span
          className={`grid ${
            buttonSize === "small" ? "h-6 w-6" : "h-9 w-9"
          } rotate-45 place-items-center border transition-colors ${
            color === "white"
              ? `border-white ${disabled ? "" : "group-hover:bg-white/20"}`
              : `border-text ${disabled ? "" : "group-hover:bg-[#f1f1f1]"}`
          }`}
        >
          <span className="-rotate-45 text-xl leading-none">{direction === "left" ? "‹" : "›"}</span>
        </span>
        <span>{label}</span>
      </button>
    </>
  );
};
