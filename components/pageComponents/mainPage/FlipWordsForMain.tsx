import React from "react";
import { FlipWords } from "./FlipWords";

const words = ["надежнее", "доступнее", "быстрее", "удобнее"];

export default function FlipWordsForMain() {
  return (
    <div className="h-[5rem] flex justify-center items-center px-4 mt-5">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Покупайте автозапчасти
        <FlipWords words={words} /> <br />с СургутАвтоКомплект
      </div>
    </div>
  );
}
