import { IoArrowForward } from 'react-icons/io5';
import style from './style.module.scss';

export const Score = (props: {score: number, history: boolean[], onClick: () => void}) => {
    const renderMessage = () => {
        const percentageRightAnswers = (props.score * 100) / props.history.length;

        if (percentageRightAnswers >= 70) {
            return 'Good job !!';
        } else if (percentageRightAnswers >= 50) {
            return 'Keep training ! You\'re getting better';
        } else {
            return 'You need more practice';
        }
    };

    return (
        <main className={style.container}>
            <h2 className={style.container__title}>Score</h2>
            <p className={style.container__score}>{props.score}/{props.history.length}</p>
            <p className={style.container__message}>{renderMessage()}</p>

            <div className={style.container__divButton}>
                <button className={style.container__divButton__button} onClick={() => props.onClick()}>Try again<IoArrowForward /></button>
            </div>
        </main>
    );
};