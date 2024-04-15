import { QuizzCategory } from '../src/components/StepQuestionCategory/StepQuestionCategory';

const BASE_URL = 'https://opentdb.com';

interface fetchQuizzCategories {
    trivia_categories : QuizzCategory[];
}

export class QuizzApi {

    static async fetchCategories(): Promise<QuizzCategory[]> {
        const response = await fetch(`${BASE_URL}/api_category.php`);
        const data: fetchQuizzCategories = await response.json();
        return data.trivia_categories;
    }
}