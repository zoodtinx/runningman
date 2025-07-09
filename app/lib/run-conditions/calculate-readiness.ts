import { RunCondition } from "@prisma/client";

type ReadinessResult = {
   readinessScore: number;
   headline: string;
   detail: string;
   keyCondition: string[];
};

const HEADLINES = [
   "THE VIBES SAYS REST",
   "RUN, BUT MAKE IT LIGHT",
   "DECENT DAY TO RUN",
   "PERFECT RUNNING WEATHER",
   "IT'S GLORIOUS OUT THERE",
];

export function getRunSummary(
   importanceWeights: Record<string, number>,
   conditions: RunCondition[]
): ReadinessResult {
   const weightedConditions = conditions.map((condition) => {
      const weight = importanceWeights[condition.type] ?? 0;
      const weightedScore = condition.range * weight;

      return { ...condition, weight, weightedScore };
   });

   const totalWeight = weightedConditions.reduce((sum, c) => sum + c.weight, 0);
   const totalWeightedScore = weightedConditions.reduce(
      (sum, c) => sum + c.weightedScore,
      0
   );

   const averageScore =
      totalWeight === 0 ? 0 : totalWeightedScore / totalWeight;
   const readinessScore = Math.max(
      1,
      Math.min(5, Math.round((averageScore / 3) * 5))
   );

   const topConditions = weightedConditions
      .filter((c) => c.type !== "sunset-time" && c.type !== "sunrise-time")
      .filter((c) => (readinessScore < 3 ? c.range === 1 : c.range === 3))
      .slice(0, 3);

   const keyCondition = topConditions.map((c) => c.type);

   const detail = topConditions.map((c) => `${c.summary}.`).join(" ");

   return {
      readinessScore,
      headline: HEADLINES[readinessScore - 1],
      detail,
      keyCondition,
   };
}
