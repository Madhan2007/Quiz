// Main Entry Point
import './style.css';
import { getLoginHTML, setupLogin } from './src/components/Login.js';
import { getHomeHTML, setupHome } from './src/components/Home.js';
import { getQuizHTML, setupQuiz } from './src/components/Quiz.js';
import { getFlashcardsHTML, setupFlashcards } from './src/components/Flashcards.js';

console.log('Neon Oort Initialized');

try {
  const app = document.querySelector('#app');

  // State
  let currentState = 'LOGIN'; // 'LOGIN' | 'HOME' | 'QUIZ' | 'FLASHCARDS'
  let currentTopic = '';

  function render() {
    if (currentState === 'LOGIN') {
      app.innerHTML = getLoginHTML();
      setupLogin(() => {
        currentState = 'HOME';
        render();
      });
    } else if (currentState === 'HOME') {
      app.innerHTML = getHomeHTML();
      setupHome(
        (topic) => { // onStartQuiz
          currentTopic = topic;
          currentState = 'QUIZ';
          render();
        },
        (topic) => { // onStartFlashcards
          currentTopic = topic;
          currentState = 'FLASHCARDS';
          render();
        }
      );
    } else if (currentState === 'QUIZ') {
      app.innerHTML = getQuizHTML();
      setupQuiz(currentTopic, () => {
        currentState = 'HOME';
        render();
      });
    } else if (currentState === 'FLASHCARDS') {
      app.innerHTML = getFlashcardsHTML();
      setupFlashcards(currentTopic, () => {
        currentState = 'HOME';
        render();
      });
    }
  }

  render();
} catch (err) {
  console.error("Critical Main Error:", err);
  document.body.innerHTML += `<div style="color: red; padding: 20px;">CRITICAL ERROR: ${err.message}</div>`;
}
