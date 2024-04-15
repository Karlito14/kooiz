import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { QuizzApi } from '../../../api/quizz-api.ts';

export interface QuizzCategory {
    id: number;
    name: string;
}

export const StepQuestionCategory = () => {
    const [categories, setCategories] = useState<QuizzCategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await QuizzApi.fetchCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    console.log(categories);

    return <>StepQuestionCategory</>;
};