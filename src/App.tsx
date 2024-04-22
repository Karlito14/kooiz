import { Header } from './components/Header/Header.tsx';
import '../global.scss';
import { useEffect, useState } from 'react';
import { StepQuestionQty } from './components/StepQuestionQty/StepQuestionQty.tsx';
import { StepQuestionCategory } from './components/StepQuestionCategory/StepQuestionCategory.tsx';
import { StepQuestionDifficulty } from './components/StepQuestionDifficulty/StepQuestionDifficulty.tsx';
import { QuizzApi } from '../api/quizz-api.ts';
import { QuizzDifficulty, TypeQuizz, Step, FetchQuizzParams, QuizzCategory, quizzItem } from '../config/types.tsx';
import { PlayQuizz } from './components/PlayQuizz/PlayQuizz.tsx';
import { Score } from './components/Score/Score.tsx';

export const App = () => {
    const [step, setStep] = useState<Step>(Step.StepQuestionQty);
    const [categories, setCategories] = useState<QuizzCategory[]>([]);
    const [quizz, setQuizz] = useState<quizzItem[]>([]);
    const [quizzParams, setQuizzParams] = useState<FetchQuizzParams>({
        amount: 5,
        category: '',
        difficulty: QuizzDifficulty.Mixed,
        type: TypeQuizz.Multiple,
    });
    const [score, setScore] = useState(0);
    const [answersHistory, setAnswerHistory] = useState<boolean[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await QuizzApi.fetchCategories();
            setCategories([{id: -1, name: 'Multiple'},...data]);
        };
        fetchCategories();
    }, []);

    const onFinished = (score: number, history:boolean[]) => {
        setScore(score);
        setAnswerHistory(history);
        setStep(Step.Score);
    };

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
                return <StepQuestionDifficulty onClick={ async (difficulty: QuizzDifficulty) => {
                    const params = {...quizzParams, difficulty};
                    setQuizzParams(params);
                    const questions = await QuizzApi.fetchQuestions(params);
                    if(questions.length > 0) {
                        setQuizz(questions);
                        setStep(Step.Play);
                    } else {
                        alert(`Couldn't find ${params.amount} questions for this category, restarting game`);
                        setStep(Step.StepQuestionQty);
                    }
                }} />;
            case Step.Play :
                return <PlayQuizz quizz={quizz} onFinished={onFinished} />;
            case Step.Score :
                return <Score score={score} history={answersHistory} onClick={() => setStep(Step.StepQuestionQty)} />;                      
        }
    };

    return (
        <>
            <Header></Header>
            {renderStep()}
        </>
    );
};
