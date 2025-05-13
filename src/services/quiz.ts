import { Question } from './question.js';
import { QuestionData } from '../types/questionData.js';

export class Quiz {
    questions: Question[] = [];
    currentIndex = 0;
    score = 0;

    async loadQuestions(): Promise<void> {
        try {
            const res = await fetch('src/assets/data/questions.json');
            if (!res.ok) {
                throw new Error('Failed to load questions');
            }

            const data: QuestionData[] = await res.json();
            this.questions = data.map(q => new Question(q));
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while fetching questions');
        }
    }

    getCurrentQuestion(): Question {
        return this.questions[this.currentIndex];
    }

    answerCurrentQuestion(userAnswer: string): boolean {
        const question = this.getCurrentQuestion();
        const isCorrect = question.isCorrect(userAnswer);
        if (isCorrect) this.score++;
        return isCorrect;
    }

    hasNextQuestion(): boolean {
        return this.currentIndex < this.questions.length - 1;
    }

    nextQuestion(): void {
        this.currentIndex++;
    }
}
