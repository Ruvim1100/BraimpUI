import type { GradingSystem } from "./GradingSystem";

export interface CreateCourseModel {
  title: string;
  description?: string;
  gradingSystem: GradingSystem;
  courseCategoryId: string;
}
