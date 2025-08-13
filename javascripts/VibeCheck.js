// Survey questions
const questions = [
    "If you found a bug in your code right before a deadline, would you stay up late to fix it?",
    "Have you ever tried teaching or explaining a tech concept to someone just for fun?",
    "Would you rather build a robot that plays a game than just watch someone else play?",
    "Do you get excited when you discover a new shortcut or trick that makes your coding easier?",
    "If you could automate one boring daily task, would you jump on it immediately?"
];

// Game state
let currentQuestion = 0;
let yesCount = 0;

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const surveyScreen = document.getElementById('survey-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-btn');
const progressFill = document.getElementById('progress');
const scoreNumber = document.getElementById('score-number');
const finalScore = document.getElementById('final-score');
const contactBtn = document.getElementById('contact-btn');

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Event listeners
startBtn.addEventListener('click', startSurvey);
contactBtn.addEventListener('click', () => showScreen('contact'));
optionButtons.forEach(btn => btn.addEventListener('click', handleAnswer));
hamburger.addEventListener('click', toggleMobileMenu);
navLinks.forEach(link => link.addEventListener('click', handleNavigation));

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Handle navigation between sections in the same HTML file
function handleNavigation(e) {
    e.preventDefault();
    const page = e.target.dataset.page;

    // Close mobile menu if open
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');

    showScreen(page);
}

function startSurvey() {
    showScreen('survey');
    displayQuestion();
}

function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenName + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

function displayQuestion() {
    if (currentQuestion < questions.length) {
        questionText.textContent = questions[currentQuestion];
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
}

function handleAnswer(e) {
    const answer = e.target.dataset.answer;
    if (answer === 'yes') yesCount++;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        setTimeout(() => {
            displayQuestion();
        }, 200);
    } else {
        showLoading();
    }
}

function showLoading() {
    showScreen('loading');
    const loadingTime = Math.random() * 2000 + 1000;
    setTimeout(showResults, loadingTime);
}

function showResults() {
    showScreen('results');

    let score;
    if (yesCount === 0) score = 85;
    else if (yesCount === 1) score = 88;
    else if (yesCount === 2) score = 91;
    else if (yesCount === 3) score = 94;
    else if (yesCount === 4) score = 97;
    else score = 100;

    animateScore(score);
}

function animateScore(targetScore) {
    let currentScore = 85;
    const increment = (targetScore - 85) / 20;

    const scoreAnimation = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(scoreAnimation);
        }
        const roundedScore = Math.round(currentScore);
        scoreNumber.textContent = roundedScore;
        finalScore.textContent = roundedScore;
    }, 50);
}

function resetSurvey() {
    currentQuestion = 0;
    yesCount = 0;
    progressFill.style.width = '0%';
    showScreen('welcome');
}

// Button click animation & keyboard shortcuts
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => button.style.transform = '', 100);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (surveyScreen.classList.contains('active')) {
            if (e.key === '1' || e.key.toLowerCase() === 'y') optionButtons[0].click();
            else if (e.key === '2' || e.key.toLowerCase() === 'n') optionButtons[1].click();
        }
    });
});
