document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.card-container');
  const cards = Array.from(container.children);

  // --- Shuffle cards order ---
  cards.sort(() => Math.random() - 0.5);
  cards.forEach(card => container.appendChild(card));

  // --- Vibrant colors array ---
  const vibrantColors = [
    '#FF0000', '#FFBD33', '#75FF33', '#FFFF00', '#33FFBD', '#33BDFF',
    '#3375FF', '#7533FF', '#BD33FF', '#FF33BD', '#FF336E', '#FF9933'
  ];

  // --- Shuffle colors to avoid repetition ---
  const shuffledColors = vibrantColors.sort(() => Math.random() - 0.5);

  cards.forEach((card, index) => {
    // Random width & height
    const width = Math.floor(Math.random() * 200) + 200; // 200–400px
    const height = Math.floor(Math.random() * 250) + 250; // 250–500px
    card.style.width = width + "px";
    card.style.height = height + "px";

    // Random margins
    card.style.marginTop = Math.floor(Math.random() * 101) + 'px';
    card.style.marginBottom = Math.floor(Math.random() * 51) + 'px';
    card.style.marginLeft = Math.floor(Math.random() * 61) + 'px';
    card.style.marginRight = Math.floor(Math.random() * 61) + 'px';

    // Assign unique vibrant color
    card.style.backgroundColor = shuffledColors[index % shuffledColors.length];
  });
});


document.querySelectorAll('.fixed-footer-bar .nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetUrl = button.dataset.target;
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    });
  });