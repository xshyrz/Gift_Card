import confetti from 'https://esm.run/canvas-confetti';

const box = document.querySelector('.gift-box');
const lid = document.querySelector('.box-lid');
const messageCard = document.querySelector('.message-card');
const closeBtn = document.querySelector('.close-btn');
const hint = document.querySelector('.hint');

let isOpen = false;
let isShaking = false;

// Snow Animation
function createSnow() {
  const snowContainer = document.createElement('div');
  snowContainer.style.position = 'fixed';
  snowContainer.style.top = '0';
  snowContainer.style.left = '0';
  snowContainer.style.width = '100%';
  snowContainer.style.height = '100%';
  snowContainer.style.pointerEvents = 'none';
  snowContainer.style.zIndex = '0';
  document.body.appendChild(snowContainer);

  const snowflakes = ['❄', '❅', '❆', '•'];
  
  setInterval(() => {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
    
    const startLeft = Math.random() * 100;
    const duration = Math.random() * 5 + 5; // 5-10s
    const size = Math.random() * 1 + 0.5; // 0.5-1.5em
    const opacity = Math.random() * 0.5 + 0.3;
    
    snowflake.style.left = `${startLeft}vw`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.fontSize = `${size}em`;
    snowflake.style.opacity = opacity;
    
    snowContainer.appendChild(snowflake);
    
    // Clean up
    setTimeout(() => {
      snowflake.remove();
    }, duration * 1000);
  }, 200);
}

// Start Snow
createSnow();

function triggerConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#d4af37', '#c0c0c0', '#ff0000', '#ffffff']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#d4af37', '#c0c0c0', '#ff0000', '#ffffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

if (box) {
  box.addEventListener('click', () => {
    if (isOpen || isShaking) return;

    isShaking = true;
    box.classList.add('shaking');
    if (hint) hint.classList.add('hidden');

    setTimeout(() => {
      box.classList.remove('shaking');
      isShaking = false;
      isOpen = true;
      
      // Open animation
      box.classList.add('open');
      
      // Show message
      setTimeout(() => {
        if (messageCard) messageCard.classList.add('visible');
      }, 200);

      triggerConfetti();
    }, 1000);
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent box click
    
    // Reset
    if (messageCard) messageCard.classList.remove('visible');
    if (box) box.classList.remove('open');
    
    setTimeout(() => {
      isOpen = false;
      if (hint) hint.classList.remove('hidden');
    }, 500);
  });
}