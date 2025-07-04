export interface LessonBlockCreateParams {
  courseId: string;
  moduleId: string;
  lessonId: string;
  blockType: 0 | 1 | 2 | 4
  content: string;
}