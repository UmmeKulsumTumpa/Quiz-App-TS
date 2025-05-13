var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Question } from './question.js';
export class Quiz {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
    }
    loadQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch('src/assets/data/questions.json');
                if (!res.ok) {
                    throw new Error('Failed to load questions');
                }
                const data = yield res.json();
                this.questions = data.map(q => new Question(q));
            }
            catch (error) {
                console.error(error);
                throw new Error('An error occurred while fetching questions');
            }
        });
    }
    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }
    answerCurrentQuestion(userAnswer) {
        const question = this.getCurrentQuestion();
        const isCorrect = question.isCorrect(userAnswer);
        if (isCorrect)
            this.score++;
        return isCorrect;
    }
    hasNextQuestion() {
        return this.currentIndex < this.questions.length - 1;
    }
    nextQuestion() {
        this.currentIndex++;
    }
}
