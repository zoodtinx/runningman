export function calculateRunningReadinessScore(
   conditions: {
      range: number;
      importance: number;
   }[]
): number {
   if (!conditions.length) return 5;

   const rangeToScore = (r: number) => {
      if (r === 1) return 5;
      if (r === 2) return 3;
      if (r === 3) return 1;
      return 3;
   };

   let totalWeightedScore = 0;
   let totalWeight = 0;

   for (const cond of conditions) {
      if (cond.importance <= 0) continue;

      const score = rangeToScore(cond.range);
      totalWeightedScore += score * cond.importance;
      totalWeight += cond.importance;
   }

   if (totalWeight === 0) return 5;

   const avgScore = totalWeightedScore / totalWeight;

   if (avgScore <= 1.8) return 1;
   if (avgScore <= 2.6) return 2;
   if (avgScore <= 3.4) return 3;
   if (avgScore <= 4.2) return 4;
   return 5;
}
