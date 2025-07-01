export type QuestionType = "SingleChoice" | "MultipleChoice" | "Text";

export interface AttemptAnswer {
  id: string;
  questionText: string;
  questionType: QuestionType;
  weight: number;
  quizAttemptId: string;
}

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
  attemptAnswerId: string;
}
