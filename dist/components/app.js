var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Quiz } from '../services/quiz.js';
import { Timer } from '../services/timer.js';
import { UI } from './ui.js';
import { questionConfig } from '../config/config.js';
export class App {
    constructor() {
        this.quiz = new Quiz();
        this.timer = new Timer(questionConfig.timePerQuestion, () => this.handleTimeout(), (time) => UI.updateTimer(time));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.quiz.loadQuestions();
            UI.showScreen(UI.quizScreen);
            this.renderCurrentQuestion();
            this.timer.start();
        });
    }
    renderCurrentQuestion() {
        const question = this.quiz.getCurrentQuestion();
        UI.renderQuestion(question, (userAnswer) => this.handleAnswer(userAnswer));
    }
    handleAnswer(userAnswer) {
        this.timer.reset();
        const isCorrect = this.quiz.answerCurrentQuestion(userAnswer);
        UI.showFeedback(isCorrect);
        if (this.quiz.hasNextQuestion()) {
            this.quiz.nextQuestion();
            this.timer.start();
            this.renderCurrentQuestion();
        }
        else {
            this.finishQuiz();
        }
    }
    handleTimeout() {
        if (this.quiz.hasNextQuestion()) {
            this.quiz.nextQuestion();
            this.timer.reset();
            this.timer.start();
            this.renderCurrentQuestion();
        }
        else {
            this.finishQuiz();
        }
    }
    finishQuiz() {
        this.timer.stop();
        UI.showScreen(UI.resultScreen);
        UI.showScore(this.quiz.score, this.quiz.questions.length);
    }
}
