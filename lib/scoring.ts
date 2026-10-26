export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export type CriterionKey =
  | "fit"
  | "customer"
  | "access"
  | "solution"
  | "competition"
  | "economics"
  | "delivery";

export type Ratings = Record<CriterionKey, Rating>;

export const criteria: Array<{
  key: CriterionKey;
  label: string;
  prompt: string;
  weight: number;
}> = [
  { key: "fit", label: "Strategic fit", prompt: "Does this advance a capability we want to own?", weight: 18 },
  { key: "customer", label: "Customer need", prompt: "Is the mission need funded, urgent, and specific?", weight: 18 },
  { key: "access", label: "Customer access", prompt: "Can we validate needs before the decision window closes?", weight: 14 },
  { key: "solution", label: "Solution advantage", prompt: "Can we prove a meaningful, defensible advantage?", weight: 18 },
  { key: "competition", label: "Competitive position", prompt: "Do we understand and counter the likely field?", weight: 12 },
  { key: "economics", label: "Economics", prompt: "Is the expected return worth capture and proposal cost?", weight: 10 },
  { key: "delivery", label: "Delivery confidence", prompt: "Can we staff, price, and execute without wishful thinking?", weight: 10 },
];

export const defaultRatings: Ratings = {
  fit: 4,
  customer: 4,
  access: 2,
  solution: 3,
  competition: 2,
  economics: 4,
  delivery: 3,
};

export function scorePursuit(ratings: Ratings) {
  const score = Math.round(
    criteria.reduce((total, item) => total + (ratings[item.key] / 5) * item.weight, 0),
  );
  const confidence = Math.round(
    criteria.reduce((total, item) => total + (ratings[item.key] >= 3 ? item.weight : item.weight * 0.35), 0),
  );
  const recommendation = score >= 72 ? "Bid" : score >= 55 ? "Conditional bid" : "No-bid";
  return { score, confidence, recommendation } as const;
}
