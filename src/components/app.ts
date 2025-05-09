import { Quiz } from '../services/quiz.js';
import { Timer } from '../services/timer.js';
import { UI } from './ui.js';
import { questionConfig } from '../config/config.js';

export class App {
    private quiz: Quiz;
    private timer: Timer;

    constructor() {
        this.quiz = new Quiz();
        this.timer = new Timer(questionConfig.timePerQuestion, () => this.handleTimeout(), (time: number) => UI.updateTimer(time));
    }

    async start(): Promise<void> {
        await this.quiz.loadQuestions();
        UI.showScreen(UI.quizScreen);
        this.renderCurrentQuestion();
        this.timer.start();
    }

    private renderCurrentQuestion(): void {
        const question = this.quiz.getCurrentQuestion();
        UI.renderQuestion(question, (userAnswer: string) => this.handleAnswer(userAnswer));
    }

    private handleAnswer(userAnswer: string): void {
        this.timer.reset();
        const isCorrect = this.quiz.answerCurrentQuestion(userAnswer);
        UI.showFeedback(isCorrect);

        if (this.quiz.hasNextQuestion()) {
            this.quiz.nextQuestion();
            this.timer.start();
            this.renderCurrentQuestion();
        } else {
            this.finishQuiz();
        }
    }

    private handleTimeout(): void {
        if (this.quiz.hasNextQuestion()) {
            this.quiz.nextQuestion();
            this.timer.reset();
            this.timer.start();
            this.renderCurrentQuestion();
        } else {
            this.finishQuiz();
        }
    }

    private finishQuiz(): void {
        this.timer.stop();
        UI.showScreen(UI.resultScreen);
        UI.showScore(this.quiz.score, this.quiz.questions.length);
    }
}
