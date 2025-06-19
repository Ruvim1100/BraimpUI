export const GradingSystem = {
  TenPoint: 0,
  HundredPoint: 1,
  FivePoint: 2,
  Letter: 3,
} as const;

export type GradingSystem = (typeof GradingSystem)[keyof typeof GradingSystem];