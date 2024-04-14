import { useState } from 'react';
import { StepQuestionQty } from '../StepQuestionQty/StepQuestionQty.tsx';
import { StepQuestionCategory } from '../StepQuestionCategory/StepQuestionCategory.tsx';
import { StepQuestionDifficulty } from '../StepQuestionDifficulty/StepQuestionDifficulty.tsx';

enum Step {
    StepQuestionQty,
    StepQuestionCategory,
    StepQuestionDifficulty,
    Play,
    Score
}

export const ScreenStep = () => {
    const [step, setStep] = useState<Step>(Step.StepQuestionQty);

    switch(step) {
        case Step.StepQuestionQty :
            return <StepQuestionQty />;
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