"use client";

import { ArrowLink } from "@/app/components/ArrowLink";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import { useImageUpload } from "@/app/components/UploadImageToApi";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function Camera() {
  return (
    <Provider store={store}>
      <CameraContent />
    </Provider>
  );
}

const CameraContent = () => {
  const [cameraLoading, setCameraLoading] = useState(true);
  const [image, setImage] = useState("");
  const [isShowingCapture, setIsShowingCapture] = useState(false);
  const { isUploading, uploadImage } = useImageUpload();
  const webRef = useRef<Webcam>(null);
  const captureTimeout = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (captureTimeout.current !== null) window.clearTimeout(captureTimeout.current);
    },
    [],
  );

  const takePicture = () => {
    const snap = webRef.current?.getScreenshot();
    if (!snap) return;

    setImage(snap);
    setIsShowingCapture(true);
    if (captureTimeout.current !== null) window.clearTimeout(captureTimeout.current);
    captureTimeout.current = window.setTimeout(() => {
      setIsShowingCapture(false);
      captureTimeout.current = null;
    }, 2500);
  };

  const handleProceed = () => {
    if (image && !isUploading) void uploadImage(image);
  };

  return (
    <>
      {(cameraLoading || isUploading) && (
        <div className="fixed inset-0 bg-background z-1000">
          <LoadingScreen text={isUploading ? "LOADING ACCOUNT INFO ..." : "SETTING UP CAMERA ..."} />
        </div>
      )}

      <main className=" fixed inset-0 z-50 bg-[#d0d1d1] text-[#f7f7f7]">
        <div className="flex absolute overflow-visible w-screen h-screen top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <Webcam
            disablePictureInPicture={true}
            mirrored={true}
            ref={webRef}
            onUserMedia={() => setCameraLoading(false)}
            className={`h-full w-full object-cover ${isShowingCapture ? "invisible" : ""}`}
          />
          {isShowingCapture && (
            <img src={image} alt="Captured photo preview" className="absolute inset-0 size-full object-cover" />
          )}
        </div>
        <header className="absolute left-6 top-5 flex items-center gap-3">
          <span className="text-[9px] font-semibold tracking-[0.08em]">SKINSTRIC</span>
          <span aria-hidden="true" className="h-4 w-12 border-x border-white/45" />
        </header>

        {isShowingCapture && <p className="absolute top-1/4 left-1/2 -translate-y-1/4 -translate-x-1/2">GREAT SHOT!</p>}

        <button
          type="button"
          aria-label="Take picture"
          onClick={() => takePicture()}
          className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-3 text-[9px] font-medium text-white/90"
        >
          <span>TAKE PICTURE</span>
          <span className="grid size-11 place-items-center rounded-full border border-white/80 bg-white/15 hover:bg-white/50 transition-colors duration-150 cursor-pointer">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 stroke-[#92999b]"
              strokeWidth="1.25"
            >
              <path d="M4 8.5h3l1.4-2h7.2l1.4 2h3v10H4z" />
              <circle cx="12" cy="13.5" r="3.25" />
              <path d="M18 10h.01" />
            </svg>
          </span>
        </button>

        <div className="absolute bottom-7 left-7 grid size-8 place-items-center">
          <ArrowLink label="" direction="left" color="white" destination="results" />
        </div>

        <section className="absolute bottom-8 left-1/2 flex w-max max-w-[calc(100%-7rem)] -translate-x-1/2 flex-col items-center gap-4 text-center text-[7px] md:text-[10px] font-medium">
          <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-1.5 rotate-45 border border-white" />
              NEUTRAL EXPRESSION
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-1.5 rotate-45 border border-white" />
              FRONTAL POSE
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-1.5 rotate-45 border border-white" />
              ADEQUATE LIGHTING
            </li>
          </ul>
        </section>

        {image && (
          <div className="absolute bottom-7 right-20 grid size-12 place-items-center">
            <ArrowLink buttonSize="default" label="PROCEED" direction="right" color="white" onClick={handleProceed} />
          </div>
        )}
      </main>
    </>
  );
};
