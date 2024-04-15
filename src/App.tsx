import { Header } from './components/Header/Header.tsx';
import '../global.scss';
import { useState } from 'react';
import { StepQuestionQty } from './components/StepQuestionQty/StepQuestionQty.tsx';
import { StepQuestionCategory } from './components/StepQuestionCategory/StepQuestionCategory.tsx';
import { StepQuestionDifficulty } from './components/StepQuestionDifficulty/StepQuestionDifficulty.tsx';

enum QuizzDifficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
    Mixed = '',
}

enum TypeQuizz {
    Mixed = '',
    Multiple = 'multiple',
    Boolean = 'boolean'
}

enum Step {
    StepQuestionQty,
    StepQuestionCategory,
    StepQuestionDifficulty,
    Play,
    Score,
}

interface FetchQuizzParams {
    amount: number;
    category: string;
    difficulty: QuizzDifficulty;
    type : TypeQuizz;
}

export const App = () => {
    const [step, setStep] = useState<Step>(Step.StepQuestionQty);
    const [quizzParams, setQuizzParams] = useState<FetchQuizzParams>({
        amount: 5,
        category: '',
        difficulty: QuizzDifficulty.Mixed,
        type: TypeQuizz.Mixed,
    });

    const renderStep = () => {
        switch(step) {
            case Step.StepQuestionQty :
                return <StepQuestionQty onClick={(amount: number) => {
                    setQuizzParams({...quizzParams, amount});
                    setStep(Step.StepQuestionCategory);
                }} max={30} min={5} step={5} />;
            case Step.StepQuestionCategory :
                return <StepQuestionCategory />;
            case Step.StepQuestionDifficulty :
                return <StepQuestionDifficulty />;
            case Step.Play :
                return '';
            case Step.Score :
                return '';                      
        }
    };

    return (
        <>
            <Header></Header>
            <main>
                {renderStep()}
            </main>
        </>
    );
};
