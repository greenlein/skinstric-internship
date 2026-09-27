"use client";

import { useRef } from "react";
import type { ChangeEvent } from "react";
import RotatingSquares from "@/app/components/RotatingSquares";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/app/components/LoadingScreen";
import { store } from "@/app/redux/store";
import { Provider } from "react-redux";
import { ArrowLink } from "@/app/components/ArrowLink";
import { useImageUpload } from "@/app/components/UploadImageToApi";

export default function ResultsPage() {
  return (
    <Provider store={store}>
      <ResultsContent />
    </Provider>
  );
}

const ResultsContent = () => {
  const router = useRouter();
  const { isUploading, uploadImage } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) return;

    await uploadImage(image);
    event.target.value = "";
  };

  const handleClick = () => {
    router.push("results/camera");
  };

  return (
    <main className="relative h-[calc(100vh-64px)] overflow-hidden bg-[#fafafa] text-[#1f1f1f]">
      <p className="absolute left-6 top-8 text-[12px] font-semibold tracking-[-0.03em]">TO START ANALYSIS</p>
      <div className="h-full w-full">
        {!isUploading ? (
          <div className="flex flex-col lg:flex-row h-full items-center justify-center lg:gap-8 px-6 md:gap-0">
            <div className="relative aspect-[2/1] w-full max-w-[560px] flex-1">
              <button
                className="cursor-pointer hover:scale-105 active:scale-95 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background z-1 rounded-full h-[100px] w-[100px] lg:h-[125px] lg:w-[125px] overflow-hidden"
                onClick={() => handleClick()}
              >
                <img src="/assets/aperture.png" alt="" className="h-[100px] w-[100px] lg:h-[125px] lg:w-[125px]" />
              </button>

              <p className="absolute bottom-15 left-12 lg:bottom-auto lg:left-auto lg:right-0 lg:top-0">
                ALLOW A.I. <br />
                TO SCAN YOUR FACE
              </p>

              <figure className="absolute right-[25%] top-0 scale-55 z-0 invisible lg:visible">
                <img src="/assets/arrow.png" alt="" />
              </figure>

              <RotatingSquares size={350} />
            </div>

            <div className="relative aspect-[2/1] w-full max-w-[560px] flex-1">
              <button
                type="button"
                className="cursor-pointer hover:scale-105 active:scale-95 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background z-1 rounded-full h-[100px] w-[100px] lg:h-[125px] lg:w-[125px] overflow-hidden"
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
              >
                <img
                  src="/assets/landscape.png"
                  alt=""
                  className="h-[100px] w-[100px] lg:h-[125px] lg:w-[125px] overflow-hidden"
                />
              </button>
              <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />

              <p className="absolute top-15 right-12 lg:top-auto lg:right-auto lg:bottom-0 lg:left-0 text-end">
                ALLOW A.I. <br />
                ACCESS TO GALLERY
              </p>

              <figure className="absolute bottom-0 left-[25%] scale-59 rotate-180 invisible lg:visible">
                <img src="/assets/arrow.png" alt="" />
              </figure>
              <RotatingSquares size={350} />
            </div>
          </div>
        ) : (
          <LoadingScreen text="PREPARING YOUR ANALYSIS ..." />
        )}
      </div>
      <div className="absolute bottom-7 left-7">
        <ArrowLink label="BACK" direction="left" destination="/" />
      </div>
    </main>
  );
};
