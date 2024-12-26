import { useSetAtom } from "jotai";
import { motion } from "framer-motion";
import { stepAtom } from "../../atoms/form";
import { slideVariants } from "./animations";
import { useEffect } from "react";

export function IntroStep() {
  const setStep = useSetAtom(stepAtom);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.repeat) {
        e.preventDefault();
        setStep("birth");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setStep]);

  return (
    <motion.div
      key="intro"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col items-center justify-center min-h-[400px] space-y-8 text-center"
    >
      <h2 className="text-4xl font-bold text-gray-800">
        Ready to discover your life in numbers?
      </h2>
      <p className="text-xl text-gray-600">
        Let's take a journey through your timeline together.
      </p>
      <button
        onClick={() => setStep("birth")}
        className="w-full px-5 py-5 bg-blue-500 text-white rounded-xl text-xl font-medium hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Begin Journey
      </button>
    </motion.div>
  );
}
