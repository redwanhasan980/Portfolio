const words = [
  "coding...",
  "development...",
  "robotics...",
  "machine learning...",
    "ROS...",
  "programming...",
  "javascript...",
  "c++...",
  "python...",
    "java...",
  "flutter...",
  "debugging...",
  "problem solving...",
  "artificial intelligence...",
  "autonomous systems...",
  "business...",
  "data structures...",
  "machine vision..."
];

const dynamicText = document.getElementById("dynamic-text");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typingSpeed = 120;
const deletingSpeed = 70;
const pauseBetween = 1500;

function type() {
  const currentWord = words[wordIndex];
  if (!deleting) {
    dynamicText.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => {
        deleting = true;
        type();
      }, pauseBetween);
      return;
    }
  } else {
    dynamicText.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? deletingSpeed : typingSpeed);
}

type();

// Image slider
const images = document.querySelectorAll("#image-slider img");
let currentImageIndex = 0;

function showNextImage() {
  images[currentImageIndex].classList.remove("active");
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add("active");
}

setInterval(showNextImage, 5000);

// --- Bouncing Balls Animation ---

// Change ball elements to containers

  const balls = [
  { el: document.getElementById('ball-container1'), x: 0, y: 0, vx: 1.5, vy: 1 },
  { el: document.getElementById('ball-container2'), x: 300, y: 100, vx: -1.25, vy: 1.5 },
  { el: document.getElementById('ball-container3'), x: 600, y: 200, vx: 1, vy: -1.5 },
  { el: document.getElementById('ball-container4'), x: 400, y: 300, vx: -1.5, vy: -1.25 },
];


const ballSize = 80;

function updateBalls() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  balls.forEach(ball => {
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Bounce horizontally with center logic
    if (ball.x + ballSize / 2 >= width) {
      ball.x = width - ballSize / 2;
      ball.vx *= -1;
    } else if (ball.x - ballSize / 2 <= 0) {
      ball.x = ballSize / 2;
      ball.vx *= -1;
    }

    // Bounce vertically with center logic
    if (ball.y + ballSize / 2 >= height) {
      ball.y = height - ballSize / 2;
      ball.vy *= -1;
    } else if (ball.y - ballSize / 2 <= 0) {
      ball.y = ballSize / 2;
      ball.vy *= -1;
    }

    ball.el.style.transform = `translate(${ball.x - ballSize / 2}px, ${ball.y - ballSize / 2}px)`;
  });

  requestAnimationFrame(updateBalls);
}
updateBalls();