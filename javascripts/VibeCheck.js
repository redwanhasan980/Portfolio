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

// Event listeners
startBtn.addEventListener('click', startSurvey);
contactBtn.addEventListener('click', handleContact);


const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');


optionButtons.forEach(btn => {
    btn.addEventListener('click', handleAnswer);
});
hamburger.addEventListener('click', toggleMobileMenu);

navLinks.forEach(link => {
    link.addEventListener('click', handleNavigation);
});

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function handleNavigation(e) {
    e.preventDefault();
    const page = e.target.dataset.page;
    
    // Close mobile menu if open
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Handle different navigation options
    let contactUrl;
    switch(page) {
        
        case 'home':
        contactUrl = '../index.html'; 
        window.location.href = contactUrl;
        break;
        case 'important':
             contactUrl = '../ImportantStuff.html'; 
        window.location.href = contactUrl;
        break;
        case 'unnecessary':
             contactUrl = '../UnnecessaryStuff.html'; 
        window.location.href = contactUrl;
        break;
        case 'contact':
            ontactUrl = '../contact.html'; 
        window.location.href = contactUrl;
        break;
    }
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
    targetScreen.classList.add('active');
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
    
    if (answer === 'yes') {
        yesCount++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        // Add a small delay for better UX
        setTimeout(() => {
            displayQuestion();
        }, 200);
    } else {
        // Survey complete, show loading
        showLoading();
    }
}

function showLoading() {
    showScreen('loading');
    
    // Random loading time between 4-7 seconds
    const loadingTime = Math.random() * 2000+1000 ; // 4000-7000ms
    
    setTimeout(() => {
        showResults();
    }, loadingTime);
}

function showResults() {
    showScreen('results');
    
    // Calculate score based on yes answers (85-100%)
    let score;
    if (yesCount === 0) score = 85;
    else if (yesCount === 1) score = 88;
    else if (yesCount === 2) score = 91;
    else if (yesCount === 3) score = 94;
    else if (yesCount === 4) score = 97;
    else score = 100; // All yes answers
    
    // Animate score counting up
    animateScore(score);
}

function animateScore(targetScore) {
    let currentScore = 85;
    const increment = (targetScore - 85) / 20; // Animate over 20 steps
    
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

function handleContact() {
   
     contactUrl = '../contact.html'; 
    
 
    window.location.href = contactUrl;
    
 
    
    ;
}

function resetSurvey() {
    currentQuestion = 0;
    yesCount = 0;
    progressFill.style.width = '0%';
    showScreen('welcome');
}

// Add some fun interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add click sound effect (optional)
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        });
    });
    
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (surveyScreen.classList.contains('active')) {
            if (e.key === '1' || e.key.toLowerCase() === 'y') {
                // Simulate clicking Yes button
                optionButtons[0].click();
            } else if (e.key === '2' || e.key.toLowerCase() === 'n') {
                // Simulate clicking No button
                optionButtons[1].click();
            }
        }
    });
});