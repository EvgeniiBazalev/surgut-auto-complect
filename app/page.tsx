import CardStackMain from "@/components/pageComponents/mainPage/CardStackMain";
import { FeaturesSection } from "@/components/pageComponents/mainPage/FeaturesSection";
import FlipWordsForMain from "@/components/pageComponents/mainPage/FlipWordsForMain";
import InfiniteMovingCardsMain from "@/components/pageComponents/mainPage/InfiniteMovingCardsMain";

export default function Index() {
  return (
    <div className="w-full">
      <InfiniteMovingCardsMain />

      <div className="mt-20 flex flex-col md:flex-row md:space-x-96 space-y-4 md:space-y-0">
        <FlipWordsForMain />
        <CardStackMain />
      </div>
      <FeaturesSection />
    </div>
  );
}
