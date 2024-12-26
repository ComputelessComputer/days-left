import { AnimatePresence } from "framer-motion";
import { Provider } from "jotai";
import { useAtom } from "jotai";
import { stepAtom } from "../atoms/form";
import { AgeStep } from "../components/form/AgeStep";
import { BirthStep } from "../components/form/BirthStep";
import { IntroStep } from "../components/form/IntroStep";

export default function Home() {
  return (
    <Provider>
      <HomeContent />
    </Provider>
  );
}

function HomeContent() {
  const [step] = useAtom(stepAtom);

  return (
    <div className="min-h-screen bg-gray-50 p-4 w-full items-center flex justify-center">
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === "intro" && <IntroStep />}
          {step === "birth" && <BirthStep />}
          {step === "age" && <AgeStep />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function meta() {
  return [
    { title: "Days Left - Calculate Your Remaining Days" },
    {
      name: "description",
      content:
        "Calculate how many days you have left to live based on your expected lifespan.",
    },
  ];
}
