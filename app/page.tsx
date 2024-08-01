import CardStackMain from "@/components/pageComponents/mainPage/CardStackMain";
import FAQ from "@/components/pageComponents/mainPage/FAQ";
import { FeaturesSection } from "@/components/pageComponents/mainPage/FeaturesSection";
import FlipWordsForMain from "@/components/pageComponents/mainPage/FlipWordsForMain";
import InfiniteMovingCardsMain from "@/components/pageComponents/mainPage/InfiniteMovingCardsMain";

export default function Index() {
  return (
    <div className="w-full">
      <FlipWordsForMain />
      <InfiniteMovingCardsMain />
      <h3 className="mt-5 text-4xl text-center font-bold tracking-tight text-gray-900">
        Распродажа по супер цене!
      </h3>

      <FeaturesSection />

      <div className="mt-10 flex flex-col md:flex-row md:space-x-14 space-y-4 md:space-y-0 justify-center items-center">
        <CardStackMain />
        <FAQ />
      </div>
    </div>
  );
}
