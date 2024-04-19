import { useState } from 'react';
import { Step, quizzItem } from '../../../config/types';
import style from './style.module.scss';

export const PlayQuizz = (props : {quizz: quizzItem[]}) => {

    const [index, setIndex] = useState(0);
    const [answerSelected, setAnswerSelected] = useState('');
    const { correct_answer } = props.quizz[index];
    const availableAnswers = [correct_answer, ...props.quizz[index].incorrect_answers];
    const [score, setScore] = useState(0);
    const updateQuestion = (answer : string) => {
        if (answer === correct_answer) {
            setScore(score + 1);
        }
        setIndex(index + 1);
        if(index === props.quizz.length - 1) {
            alert(`${score}`);
        }
    };

    return (
        <main className={style.container}>
            <h2 className={style.container__title} dangerouslySetInnerHTML={{__html: props.quizz[index].question}}/>
            <div className={style.containerRadio}>
                {
                    availableAnswers.map((answer, index) => {
                        return (
                            <div key={`${answer}-${index}`}>
                                <input type="radio" id={answer} name='answer' value={answer} onChange={() => {
                                    setAnswerSelected(answer);
                                    updateQuestion(answer);
                                }} />
                                <label className={style.containerRadio__label} htmlFor={answer}>{answer}</label>
                            </div>
                        );
                    })
                }
            </div>
        </main>
    );
};