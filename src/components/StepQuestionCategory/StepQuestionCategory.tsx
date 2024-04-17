import { useState } from 'react';
import style from './style.module.scss';
import { IoArrowForward } from 'react-icons/io5';

export interface QuizzCategory {
    id: number;
    name: string;
}

export const StepQuestionCategory = (props : {categories: QuizzCategory[], onClick: (category: string) => void}) => {
    const [categorySelectedID, setCategorySelectedID] = useState<string>(props.categories[0]?.id.toString());

    return (
        <main className={style.container}>
            <h2 className={style.container__title}>Which topic ?</h2>
            <div className={style.container__grid}>
                {props.categories.length > 0 && 
                    props.categories.map((category) => {
                        return (
                            <div key={`${category.name}-${category.id}`}>
                                <input type="radio" id={category.name} name='category' value={category.id} onChange={() => setCategorySelectedID(category.id.toString())} checked={categorySelectedID === category.id.toString()} />
                                <label className={style.container__grid__label} htmlFor={category.name}>{category.name}</label>
                            </div>
                        );
                    })
                }
            </div>
            <div className={style.container__divButton}>
                <button className={style.container__divButton__button} onClick={() => props.onClick(categorySelectedID)}>Set difficulty<IoArrowForward /></button>
            </div>
        </main>
    );
};