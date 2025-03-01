export interface Submission {
  id: string;
  userId: string;
  questionId: string;
  choice: string;
  wasCorrect: boolean;
  createdAt: Date;
  updatedAt: Date;
}
