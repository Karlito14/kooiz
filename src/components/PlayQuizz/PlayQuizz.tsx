/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { QuestionStatus, quizzItem } from '../../../config/types';
import style from './style.module.scss';
import Lottie from 'lottie-react';
import validAnimation from '../../assets/lottie/valid.json';
import invalidAnimation from '../../assets/lottie/invalid.json';

export const PlayQuizz = (props : {quizz: quizzItem[]}) => {
    const [index, setIndex] = useState(0);
    const [answerSelected, setAnswerSelected] = useState('');
    const { correct_answer } = props.quizz[index];
    const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [questionStatus, setQuestionStatus] = useState<QuestionStatus>(QuestionStatus.Unanswered);
    const [answerHistory, setAnswerHistory] = useState<boolean[]>([]);

    useEffect(() => {
        const mixedAnswers = [correct_answer, ...props.quizz[index].incorrect_answers].sort(() => Math.random() - 0.5);
        setAvailableAnswers(mixedAnswers);
    },[index]);

    const updateQuestion = (answer : string) => {
        const isValid = isValidQuestion(answer);
        if (isValid) {
            setScore(score + 1);
            setQuestionStatus(QuestionStatus.Valid);
        }else {
            setQuestionStatus(QuestionStatus.Invalid);
        }
        setAnswerHistory([...answerHistory, isValid]);
    };

    const isValidQuestion = (answer: string) => {
        return answer === correct_answer;
    };

    const getColor = (answer : string) => {
        if(questionStatus === QuestionStatus.Unanswered) {
            return 'black';
        } else {
            if (answer === correct_answer) {
                return '#86EFAC';
            } else {
                return '#FECACA';
            }
        }
    };
    
    const displayProgressbar = () => {
        return (
            <div className={style.divProgressbar}>
                {
                    props.quizz.map((question, index) => {
                        return (
                            <div 
                                key={`${index}-${question.category}`} 
                                className={style.divProgressbar__progressBar} 
                                style={{backgroundColor: answerHistory[index] ? '#86EFAC' : answerHistory[index] === false ? '#FECACA' : '#D1D4DB'}}
                            />
                        );
                    })
                }
            </div>
        );
    };

    return (
        <main className={style.container}>
            {displayProgressbar()}
            <h2 className={style.container__title} dangerouslySetInnerHTML={{__html: props.quizz[index].question}}/>
            <div className={style.containerRadio}>
                {
                    availableAnswers.map((answer, index) => {
                        return (
                            <div key={`${answer}-${index}`}>
                                <input 
                                    type="radio" 
                                    id={answer} 
                                    name='answer' 
                                    value={answer} 
                                    onChange={() => {
                                        setAnswerSelected(answer);
                                        updateQuestion(answer);
                                    }} 
                                    disabled={questionStatus !== QuestionStatus.Unanswered ? true : false}
                                />
                                <label 
                                    className={style.containerRadio__label} 
                                    htmlFor={answer} 
                                    dangerouslySetInnerHTML={{__html: answer}} 
                                    style={{color: getColor(answer)}}
                                />
                            </div>
                        );
                    })
                }
            </div>
            <Lottie 
                loop={false} 
                style={{marginTop: 100, height: 150}} 
                animationData={questionStatus === QuestionStatus.Valid ? validAnimation : questionStatus === QuestionStatus.Invalid ? invalidAnimation : null}
                onComplete={() => {
                    setQuestionStatus(QuestionStatus.Unanswered);
                    setIndex(index + 1);
                }}
            />
        </main>
    );
};