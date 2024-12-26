interface DotGridProps {
  daysLeft: number;
  totalDays: number;
}

export function DotGrid({ daysLeft, totalDays }: DotGridProps) {
  const dots = Array.from({ length: totalDays }, (_, i) => i < daysLeft);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Dot Grid View</h3>
      <div className="grid grid-cols-7 gap-2">
        {dots.map((active, i) => (
          <div
            key={i}
            className={`
              w-4 h-4 rounded-full transition-all duration-300
              ${active ? 'bg-blue-500 scale-100' : 'bg-gray-200 scale-90'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
