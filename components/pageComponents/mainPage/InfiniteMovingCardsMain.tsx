import React from "react";
import { InfiniteMovingCards } from "./InfiniteMovingCards";

const items = [
  {
    quote:
      "“The best time to plant a tree was 20 years ago. The second best time is now.”",
    name: "Chinese Proverb",
    title: "Dr. Su",
  },

  {
    quote:
      "“The best time to plant a tree was 20 years ago. The second best time is now.”",
    name: "Chinese Proverb",
    title: "Dr. Su",
  },

  {
    quote:
      "“The best time to plant a tree was 20 years ago. The second best time is now.”",
    name: "Chinese Proverb",
    title: "Dr. Su",
  },
];

const InfiniteMovingCardsMain = () => {
  return <InfiniteMovingCards items={items} className="mt-20" />;
};

export default InfiniteMovingCardsMain;
