import { App } from './components/app.js';
import { UI } from './components/ui.js';
const app = new App();
UI.startBtn.addEventListener('click', () => app.start());
UI.restartBtn.addEventListener('click', () => window.location.reload());
