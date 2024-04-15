import { useState } from 'react';
import style from './style.module.scss';

interface Props {
    max: number;
    min: number;
    step: number;
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
        <div className={style.container}>
            <label className={style.container__label} htmlFor="questionQty">How many questions ?</label>
            <input 
                className={style.container__input} 
                value={quantity} 
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
        </div>
    );
};