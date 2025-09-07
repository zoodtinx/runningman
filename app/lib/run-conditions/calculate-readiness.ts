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
   // normalize range 1–3 to 0–1, apply weights
   let totalWeight = 0;
   let weightedSum = 0;

   conditions.forEach((c) => {
      const weight = importanceWeights[c.type] ?? 0;
      if (weight === 0) return;
      //normalize
      const normalized = (c.range - 1) / 2;
      const weightedScore = normalized * weight;

      totalWeight += weight;
      weightedSum += weightedScore;
   });

   const averageScore = totalWeight ? weightedSum / totalWeight : 0;
   // map normalized score to actual score (or 1–5 headline index)
   const readinessScore = mapScore(averageScore);

   const topConditions = getTopConditions(conditions, readinessScore);

   const keyCondition = topConditions.map((c) => c.type);
   const detail = topConditions.map((c) => `${c.summary}.`).join(" ");

   return {
      readinessScore,
      headline: HEADLINES[readinessScore - 1],
      detail,
      keyCondition,
   };
}

function getTopConditions(conditions: RunCondition[], averageScore: number) {
   const isBadMode = averageScore < 3;

   return conditions
      .filter((c) => c.type !== "sunset-time" && c.type !== "sunrise-time")
      .sort((a, b) => (isBadMode ? a.range - b.range : b.range - a.range))
      .slice(0, 3);
}

function mapScore(avg: number) {
   return Math.min(5, Math.max(1, Math.round(avg * 4 + 1)));
}
