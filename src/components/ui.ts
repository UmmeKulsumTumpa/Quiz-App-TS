import { Question } from '../services/question.js';

export const UI = {
    startScreen: document.getElementById('start-screen') as HTMLElement,
    quizScreen: document.getElementById('quiz-screen') as HTMLElement,
    resultScreen: document.getElementById('result-screen') as HTMLElement,
    startBtn: document.getElementById('start-btn') as HTMLButtonElement,
    restartBtn: document.getElementById('restart-btn') as HTMLButtonElement,
    questionContainer: document.getElementById('question-container') as HTMLElement,
    answersContainer: document.getElementById('answers-container') as HTMLElement,
    timerElement: document.getElementById('time') as HTMLElement,
    scoreElement: document.getElementById('score') as HTMLElement,

    showScreen(screen: HTMLElement): void {
        this.startScreen.classList.add('hidden');
        this.quizScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');
        screen.classList.remove('hidden');
    },

    renderQuestion(questionObj: Question, onAnswerClick: (answer: string) => void): void {
        this.questionContainer.innerText = questionObj.question;
        this.answersContainer.innerHTML = '';

        questionObj.choices.forEach(choice => {
            const btn: HTMLButtonElement = document.createElement('button'); // should i define the type of btn as HTMLButtonElement? is this a standard practice?
            btn.innerText = choice;
            btn.addEventListener('click', () => onAnswerClick(choice));
            this.answersContainer.appendChild(btn);
        });
    },

    showScore(score: number, total: number): void {
        this.scoreElement.innerText = `Your Score: ${score}/${total}`;
    },

    updateTimer(time: number): void {
        this.timerElement.innerText = time.toString();
    },

    showFeedback(isCorrect: boolean): void {
        document.body.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
        setTimeout(() => {
            document.body.style.backgroundColor = '#f4f4f4';
        }, 1000);
    }
};
