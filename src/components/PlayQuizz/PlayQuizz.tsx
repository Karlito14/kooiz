import { quizzItem } from '../../../config/types';
import style from './style.module.scss';

export const PlayQuizz = (props : {quizz: quizzItem[]}) => {
    console.log(props.quizz);
    return <>Play</>;
};