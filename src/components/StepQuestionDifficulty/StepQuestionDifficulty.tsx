import { IoArrowForward } from 'react-icons/io5';
import style from './style.module.scss';
import { useState } from 'react';
import { QuizzDifficulty } from '../../../config/types';

export const StepQuestionDifficulty = (props : {onClick: (difficulty : QuizzDifficulty) => void}) => {
    const [DifficultySelected, setDifficultySelected] = useState<QuizzDifficulty>(QuizzDifficulty.Mixed);

    return (
        <main className={style.container}>
            <h2 className={style.container__title}>Which difficulty ?</h2>
            {
                Object.values(QuizzDifficulty).map((difficulty, index) => {
                    return (
                        <div key={`${difficulty}-${index}`} className={style.container__divInput}>
                            <input type="radio" id={difficulty} name='difficulty' value={difficulty} onChange={() => setDifficultySelected(difficulty)} checked={DifficultySelected === difficulty} />
                            <label className={style.container__grid__label} htmlFor={difficulty}>{difficulty === QuizzDifficulty.Mixed ? 'Multiple' : difficulty[0].toUpperCase() + difficulty.slice(1)}</label>
                        </div>
                    );
                })
            }
            <div className={style.container__divButton}>
                <button className={style.container__divButton__button} onClick={() => props.onClick(DifficultySelected)}>Play<IoArrowForward /></button>
            </div>
        </main>
    );
};