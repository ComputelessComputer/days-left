interface CircularProgressProps {
  daysLeft: number;
  totalDays: number;
}

export function CircularProgress({ daysLeft, totalDays }: CircularProgressProps) {
  const percentage = (daysLeft / totalDays) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4">Circular Progress</h3>
      <div className="relative w-40 h-40">
        <svg className="transform -rotate-90 w-40 h-40">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="45"
            className="stroke-gray-200"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="45"
            className="stroke-blue-500 transition-all duration-1000"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
}
