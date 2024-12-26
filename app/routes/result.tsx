import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { calculateLifeStats, type LifeStats, formatDate } from "~/utils/dateUtils";
import { motion } from "framer-motion";
import { DotGrid } from "~/components/DotGrid";
import { CircularProgress } from "~/components/CircularProgress";
import { useNavigate } from "react-router";

export default function Result() {
  const [searchParams] = useSearchParams();
  const [lifeStats, setLifeStats] = useState<LifeStats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const birth = searchParams.get("birth");
    const more = searchParams.get("more");

    if (!birth || !more) {
      navigate("/");
      return;
    }

    const birthDate = new Date(birth);
    const expectedAge = parseInt(more, 10);
    const now = new Date();
    const currentAge = Math.floor(
      (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    );
    const totalAge = currentAge + expectedAge;
    const stats = calculateLifeStats(birthDate, totalAge);
    setLifeStats(stats);
  }, [searchParams, navigate]);

  if (!lifeStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 w-full items-center flex justify-center">
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-3">
          <div className="text-3xl font-bold text-gray-800">
            {lifeStats.daysLeft.toLocaleString()} days remaining
          </div>
          <div className="text-xl text-gray-600">
            Expected date of departure: {formatDate(lifeStats.deathDate)}
          </div>
          <div className="text-xl text-gray-600">
            You've lived {Math.round(lifeStats.percentageLived)}% of your expected
            life
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DotGrid
            daysLeft={lifeStats.daysLeft}
            totalDays={lifeStats.totalDays}
          />
          <CircularProgress
            daysLeft={lifeStats.daysLeft}
            totalDays={lifeStats.totalDays}
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg text-lg hover:bg-gray-300 transition-colors"
          >
            Start Over
          </button>
        </div>
      </motion.div>
    </div>
  );
}
