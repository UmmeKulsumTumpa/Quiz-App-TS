import { QuestionData } from '../types/questionData.js';

export class Question {
    question: string;
    choices: string[];
    answer: string;

    constructor({ question, choices, answer }: QuestionData) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrect(userAnswer: string): boolean {
        return userAnswer === this.answer;
    }
}
