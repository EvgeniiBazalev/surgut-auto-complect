import React from "react";
import { FlipWords } from "./FlipWords";
const words = ["better", "cute", "beautiful", "modern"];

export default function FlipWordsForMain() {
  return (
    <div className="h-[15rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        websites with Aceternity UI
      </div>
    </div>
  );
}
