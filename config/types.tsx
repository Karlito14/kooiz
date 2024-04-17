export enum QuizzDifficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
    Mixed = '',
}

export enum TypeQuizz {
    Mixed = '',
    Multiple = 'multiple',
    Boolean = 'boolean'
}

export enum Step {
    StepQuestionQty,
    StepQuestionCategory,
    StepQuestionDifficulty,
    Play,
    Score,
}

export interface FetchQuizzParams {
    amount: number;
    category: string;
    difficulty: QuizzDifficulty;
    type : TypeQuizz;
}

export interface QuizzCategory {
    id: number;
    name: string;
}

export interface QuizzCategory {
    id: number;
    name: string;
}
