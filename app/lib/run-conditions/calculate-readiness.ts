import { RunCondition } from "@prisma/client";

type ReadinessResult = {
   readinessScore: number;
   headline: string;
   detail: string;
   keyCondition: string[];
};

const HEADLINES = [
   "THE VIBES SAYS REST",
   "TAKE IT EASY MODE",
   "NOT BAD FOR A RUN",
   "IDEAL RUNNING WEATHER",
   "PEAK RUNNING CONDITION",
];

export function getRunSummary(
   importanceWeights: Record<string, number>,
   conditions: RunCondition[]
): ReadinessResult {
   const weightedConditions = conditions.map((condition) => {
      const weight = importanceWeights[condition.type] ?? 0;

      // Ignore very low weight + bad condition
      const shouldIgnore = weight < 0.2 && condition.range === 1;
      if (shouldIgnore) return { ...condition, weight: 0, weightedScore: 0 };

      // Boost perfect scores
      const boost = condition.range === 3 ? 1.2 : 1;
      const weightedScore = condition.range * weight * boost;

      return { ...condition, weight, weightedScore };
   });

   const totalWeight = weightedConditions.reduce((sum, c) => sum + c.weight, 0);
   const totalWeightedScore = weightedConditions.reduce(
      (sum, c) => sum + c.weightedScore,
      0
   );

   const averageScore =
      totalWeight === 0 ? 0 : totalWeightedScore / totalWeight;

   // More generous mapping
   const readinessScore = mapScore(averageScore);

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

function mapScore(avg: number) {
   if (avg < 1) return 1; // clearly bad
   if (avg < 1.5) return 2; // low
   if (avg < 2.3) return 3; // medium
   if (avg < 2.7) return 4; // good
   return 5; // great
}
