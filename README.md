
# TrivQuiz (TypeScript Version)

A simple browser-based trivia quiz app, now fully rewritten in **TypeScript** for type safety better structure.

---

## TypeScript-Specific Improvements

Below are the key TypeScript features used and where they were applied in the project, along with why they were important.

---

### 1. **Interfaces for Object Structure**

📁 `src/types/questionData.ts`

```ts
export interface QuestionData {
    question: string;
    choices: string[];
    answer: string;
}
```

I used this interface to enforce that all quiz question objects have a specific, predictable shape. This prevents runtime errors due to unexpected data formats.

---

### 2. **Typed Class Properties and Methods**

📁 `src/services/question.ts`

```ts
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
```

By typing properties and method parameters/returns, we ensure that each `Question` object is valid and that methods behave as expected.

---

📁 `src/services/quiz.ts`

```ts
async loadQuestions(): Promise<void> {
    const data: QuestionData[] = await res.json();
    this.questions = data.map(q => new Question(q));
}
```

This ensures that questions loaded from JSON match the expected shape (`QuestionData[]`) and that the function clearly returns `Promise<void>`.

---

### 3. **Type-Safe DOM Access**

📁 `ts/components/ui.ts`

```ts
startScreen: document.getElementById('start-screen') as HTMLElement,
startBtn: document.getElementById('start-btn') as HTMLButtonElement,
```

DOM methods like `getElementById` return `HTMLElement | null`. We used `as` to assert the type when we're sure the elements exist. This gives us safe access to `.style`, `.innerText`, etc.

---

## **Why Each Change Matters**

| TypeScript Feature            | Benefit                                               |
| ----------------------------- | ----------------------------------------------------- |
| `interface`                   | Validates object shapes from JSON or external sources |
| `: string`, `: boolean`, etc. | Type-safe fields & methods in classes                 |
| `as HTMLElement`              | Avoids null reference errors with DOM elements        |
| `Promise<void>`               | Makes async behavior predictable                      |
| Modular imports               | Keeps the code clean and scalable                     |

---

## Run the Project

1. **Install TypeScript globally (if not already):**

   ```bash
   npm install -g typescript
   ```

2. **Compile the TypeScript:**

   ```bash
   tsc
   ```

3. **Open `index.html` in your browser.**

