export interface LifeStats {
  daysLeft: number;
  totalDays: number;
  percentageLived: number;
  deathDate: Date;
}

export function calculateLifeStats(dateOfBirth: Date, expectedAge: number): LifeStats {
  const now = new Date('2024-12-26T20:51:26+09:00'); // Using the provided time as source of truth
  
  // Calculate death date
  const deathDate = new Date(dateOfBirth);
  deathDate.setFullYear(dateOfBirth.getFullYear() + expectedAge);
  
  // Calculate total days in life
  const totalDays = Math.floor((deathDate.getTime() - dateOfBirth.getTime()) / (1000 * 3600 * 24));
  
  // Calculate days left
  const daysLeft = Math.max(0, Math.floor((deathDate.getTime() - now.getTime()) / (1000 * 3600 * 24)));
  
  // Calculate percentage lived
  const daysLived = totalDays - daysLeft;
  const percentageLived = (daysLived / totalDays) * 100;

  return {
    daysLeft,
    totalDays,
    percentageLived,
    deathDate
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
