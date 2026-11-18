export type PracticeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional'

export interface CodingExercise {
  id: string
  slug: string
  skillSlug: string
  title: string
  instructions: string
  difficulty: PracticeDifficulty
  objective: string
  language: string
  starterCode: string
  expectedBehavior: string
  exampleOutput: string
  hints: string[]
  rubric: string[]
}

export interface QuizQuestion {
  id: string
  prompt: string
  type: 'single' | 'true-false' | 'code-output'
  options: string[]
  answer: string
  explanation: string
}

export interface LearningQuiz { id: string; title: string; skillSlug: string; difficulty: PracticeDifficulty; questions: QuizQuestion[] }

export interface MiniProject { id: string; title: string; skillSlug: string; description: string; difficulty: PracticeDifficulty; requirements: string[]; objectives: string[]; checklist: string[]; expectedOutput: string }
