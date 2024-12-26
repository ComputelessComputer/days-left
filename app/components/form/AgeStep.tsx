import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { expectedAgeAtom, dateOfBirthAtom } from "../../atoms/form";
import { slideVariants } from "./animations";
import { useNavigate } from "react-router";

export function AgeStep() {
  const [expectedAge, setExpectedAge] = useAtom(expectedAgeAtom);
  const [dateOfBirth] = useAtom(dateOfBirthAtom);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expectedAge !== null && expectedAge > 0 && dateOfBirth) {
      navigate(
        `/result?birth=${encodeURIComponent(dateOfBirth)}&more=${expectedAge}`
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      expectedAge !== null &&
      expectedAge > 0 &&
      dateOfBirth
    ) {
      navigate(
        `/result?birth=${encodeURIComponent(dateOfBirth)}&more=${expectedAge}`
      );
    }
  };

  return (
    <motion.div
      key="age"
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col items-center justify-center min-h-[400px] space-y-8 text-center"
    >
      <h2 className="text-4xl font-bold text-gray-800">
        How many more years do you want to live?
      </h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col space-y-8 items-center">
          <input
            type="number"
            value={expectedAge === null ? "" : expectedAge}
            onChange={(e) =>
              setExpectedAge(
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
            onKeyDown={handleKeyDown}
            min={0}
            max={150}
            className="w-full px-5 py-5 text-2xl text-center bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of years..."
            required
            autoFocus
          />
          <button
            type="submit"
            className="w-full px-5 py-5 bg-blue-500 text-white rounded-xl text-xl font-medium hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Calculate My Life
          </button>
        </div>
      </form>
    </motion.div>
  );
}
