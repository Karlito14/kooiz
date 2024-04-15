import { useState } from 'react';
import style from './style.module.scss';
import { IoArrowForward } from 'react-icons/io5';

interface Props {
    max: number;
    min: number;
    step: number;
    onClick: (amount: number) => void;
}

export const StepQuestionQty = (props: Props) => {
    const [quantity, setQuantity] = useState<number>(props.min);

    const renderMarks = () => {
        const marks = [];
        for (let i = props.min; i <= props.max; i += props.step) {
            marks.push(<option value={i} key={`value-marks-${i}`} label={i.toString()}></option>);
        }
        return marks;
    };

    return(
        <>
            <main className={style.container}>
                <label className={style.container__label} htmlFor="questionQty">How many questions ?</label>
                <input 
                    onChange={(e) => setQuantity(+e.target.value) }
                    defaultValue={props.min}
                    className={style.container__input} 
                    list='tickmarks' 
                    name='questionQty' 
                    id='questionQty' 
                    type='range' 
                    step={props.step} 
                    min={props.min} 
                    max={props.max} 
                />
                <datalist className={style.container__datalist} id="tickmarks">
                    {renderMarks()}
                </datalist>
            </main>

            <footer className={style.divButton}>
                <button className={style.divButton__button} onClick={() => {props.onClick(quantity);}}>Set category<IoArrowForward /></button>
            </footer>
        </>
    );
};