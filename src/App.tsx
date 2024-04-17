import { Header } from './components/Header/Header.tsx';
import '../global.scss';
import { useEffect, useState } from 'react';
import { StepQuestionQty } from './components/StepQuestionQty/StepQuestionQty.tsx';
import { StepQuestionCategory } from './components/StepQuestionCategory/StepQuestionCategory.tsx';
import { StepQuestionDifficulty } from './components/StepQuestionDifficulty/StepQuestionDifficulty.tsx';
import { QuizzApi } from '../api/quizz-api.ts';
import { QuizzDifficulty, TypeQuizz, Step, FetchQuizzParams, QuizzCategory } from '../config/types.tsx';
import { Play } from './components/Play/Play.tsx';

export const App = () => {
    const [step, setStep] = useState<Step>(Step.StepQuestionQty);
    const [categories, setCategories] = useState<QuizzCategory[]>([]);
    const [quizzParams, setQuizzParams] = useState<FetchQuizzParams>({
        amount: 5,
        category: '',
        difficulty: QuizzDifficulty.Mixed,
        type: TypeQuizz.Mixed,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await QuizzApi.fetchCategories();
            setCategories([{id: -1, name: 'Multiple'},...data]);
        };
        fetchCategories();
    }, []);

    console.log(quizzParams);

    const renderStep = () => {
        switch(step) {
            case Step.StepQuestionQty :
                return <StepQuestionQty onClick={(amount: number) => {
                    setQuizzParams({...quizzParams, amount});
                    setStep(Step.StepQuestionCategory);
                }} max={30} min={5} step={5} />;
            case Step.StepQuestionCategory :
                return <StepQuestionCategory categories={categories} onClick={(category: string) => {
                    setQuizzParams({...quizzParams, category: category === '-1' ? '' : category});
                    setStep(Step.StepQuestionDifficulty);
                }} />;
            case Step.StepQuestionDifficulty :
                return <StepQuestionDifficulty onClick={(difficulty: QuizzDifficulty) => {
                    setQuizzParams({...quizzParams, difficulty});
                    setStep(Step.Play);
                }} />;
            case Step.Play :
                return <Play />;
            case Step.Score :
                return '';                      
        }
    };

    return (
        <>
            <Header></Header>
            {renderStep()}
        </>
    );
};
