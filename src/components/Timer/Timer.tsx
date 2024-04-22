/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import style from './style.module.scss';
let timerInterval: number;

export const Timer = (props : {max: number, onFinish: () => void}) => {
    const [timer, setTimer] = useState(props.max);

    useEffect(() => {
        timerInterval = setInterval(() => {
            setTimer(prev => prev - 1);
        },1000);
    },[]);

    useEffect(() => {
        if(timer <= 0) {
            clearInterval(timerInterval);
            props.onFinish();
        }
    },[timer]);

    return (
        <div className={style.timer}>{timer}'</div>
    );
};