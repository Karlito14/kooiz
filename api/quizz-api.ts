import { FetchQuizzParams, FetchQuizzResponse, QuizzCategory, fetchQuizzCategories, quizzItem } from '../config/types.ts';

const BASE_URL = 'https://opentdb.com';

export class QuizzApi {

    static async fetchCategories(): Promise<QuizzCategory[]> {
        const response = await fetch(`${BASE_URL}/api_category.php`);
        const data: fetchQuizzCategories = await response.json();
        return data.trivia_categories;
    }

    static async fetchQuestions (params : FetchQuizzParams): Promise<quizzItem[]> {
        const response = await fetch(`${BASE_URL}/api.php?amount=${params.amount}&category=${params.category}&difficulty=${params.difficulty}&type=${params.type}`);
        const data: FetchQuizzResponse = await response.json();
        return data.results;
    }
}