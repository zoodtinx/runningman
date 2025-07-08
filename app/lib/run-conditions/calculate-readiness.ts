import { RunCondition } from "@prisma/client";

type ReadinessResult = {
   readinessScore: number;
   headline: string;
   detail: string;
   keyCondition: string[];
};

const HEADLINES = [
   "SKIP RUNNING TODAY",
   "MAKE IT LIGHT",
   "GO RUN",
   "GOOD TO RUN",
   "PERFECT DAY TO RUN",
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
      .filter((c) => c.weight > 0)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);

   const detail = topConditions.map((c) => c.summary).join(" ");

   const keyCondition = weightedConditions
      .filter((c) => c.type !== "sunset-time" && c.type !== "sunrise-time")
      .filter((c) => (readinessScore < 3 ? c.range === 1 : c.range === 3))
      .map((c) => c.type);

   return {
      readinessScore,
      headline: HEADLINES[readinessScore - 1],
      detail,
      keyCondition,
   };
}
