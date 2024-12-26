import { useAtom, useSetAtom } from "jotai";
import { motion } from "framer-motion";
import { dateOfBirthAtom, stepAtom } from "../../atoms/form";
import { slideVariants } from "./animations";

export function BirthStep() {
  const [dateOfBirth, setDateOfBirth] = useAtom(dateOfBirthAtom);
  const setStep = useSetAtom(stepAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (dateOfBirth) {
      const date = new Date(dateOfBirth);

      if (!isNaN(date.getTime())) {
        setStep("age");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && dateOfBirth) {
      const date = new Date(dateOfBirth);
      if (!isNaN(date.getTime())) {
        setStep("age");
      }
    }
  };

  return (
    <motion.div
      key="birth"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col items-center justify-center min-h-[400px] space-y-8 text-center"
    >
      <h2 className="text-4xl font-bold text-gray-800">
        When did your story begin?
      </h2>
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        <div className="flex flex-col space-y-8 items-center">
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-6 py-4 text-xl border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
            required
            autoFocus
          />
          <button
            type="submit"
            disabled={!dateOfBirth}
            className="w-full px-5 py-5 bg-blue-500 text-white rounded-xl text-xl font-medium hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
}
