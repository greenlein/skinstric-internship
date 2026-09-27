"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import RotatingSquares from "../../components/RotatingSquares";
import LoadingScreen from "@/app/components/LoadingScreen";

const PROMPTS = [
  { placeholder: "Introduce yourself", key: "name", autoComplete: "name" },
  { placeholder: "Where are you from?", key: "location", autoComplete: "address-level2" },
] as const;

export default function IntroductionPage() {
  const router = useRouter();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const currentPrompt = PROMPTS[currentPromptIndex];
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submittedInput = input.trim();
    if (!submittedInput || /\d/.test(submittedInput)) {
      setError("Please enter a valid response.");
      return;
    }

    setError("");
    localStorage.setItem(currentPrompt.key, submittedInput);
    setInput("");

    if (currentPromptIndex === PROMPTS.length - 1) {
      postData();
      return;
    }

    setCurrentPromptIndex((prevIndex) => prevIndex + 1);
  };

  const postData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/phase-one", {
        name: localStorage.getItem("name"),
        location: localStorage.getItem("location"),
      });
      console.log(response.data);
      router.push("/results");
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading ? (
        <>
          <RotatingSquares size={550} />
          <form onSubmit={handleSubmit} className="absolute inset-0 flex flex-col items-center justify-center">
            <label htmlFor={currentPrompt.key} className="mb-3 text-[12px] text-[#a6a6a6]">
              CLICK TO TYPE
            </label>
            <input
              id={currentPrompt.key}
              name={currentPrompt.key}
              autoComplete={currentPrompt.autoComplete}
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              aria-describedby={error ? "input-error" : undefined}
              aria-invalid={Boolean(error)}
              placeholder={currentPrompt.placeholder}
              className="w-[225px] md:w-[356px] border-0 border-b border-[#555] bg-transparent px-0 pb-1 text-center text-[25px] md:text-[39px] font-light tracking-[-0.07em] outline-none placeholder:text-[#202124] focus:border-[#202124]"
            />
            {error && (
              <p id="input-error" role="alert" className="mt-2 text-[12px] text-red-600">
                {error}
              </p>
            )}
          </form>
        </>
      ) : (
        <LoadingScreen text="LOADING ..." />
      )}
    </>
  );
}
