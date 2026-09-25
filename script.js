/* Personal settings: update these paths or messages if you customize the surprise. */
const CONFIG = {
  photos: ['./photo1.jpg', './photo2.jpg', './photo3.jpg'],
  optionalMusic: './music.mp3'
};

const opening = document.getElementById('opening');
const openSurprise = document.getElementById('openSurprise');
const confettiLayer = document.getElementById('confettiLayer');
const sparkleButton = document.getElementById('sparkleButton');
const lastSurprise = document.getElementById('lastSurprise');
const finalScreen = document.getElementById('finalScreen');
const closeFinal = document.getElementById('closeFinal');
const finalSparkles = document.getElementById('finalSparkles');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const musicToggle = document.getElementById('musicToggle');
const birthdayMusic = document.getElementById('birthdayMusic');
const diagnosisButton = document.getElementById('diagnosisButton');
const diagnosisText = document.getElementById('diagnosisText');
const chatTrigger = document.getElementById('chatTrigger');
const surpriseMessage = document.getElementById('surpriseMessage');

function launchConfetti(target, amount = 34) {
  target.innerHTML = '';
  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${Math.random() * 12 - 10}%`;
    piece.style.animationDelay = `${Math.random() * 1.3}s`;
    piece.style.animationDuration = `${2.3 + Math.random() * 1.7}s`;
    piece.style.transform = `rotate(${Math.random() * 90}deg)`;
    target.appendChild(piece);
  }
}

openSurprise.addEventListener('click', () => {
  opening.classList.add('opened');
  launchConfetti(confettiLayer, 28);
  document.getElementById('birthday').scrollIntoView({ behavior: 'smooth' });
});

sparkleButton.addEventListener('click', () => launchConfetti(confettiLayer, 42));

diagnosisButton.addEventListener('click', () => {
  diagnosisText.textContent = 'Diagnosis confirmed: Meenu is dangerously funny, deeply caring, and impossible not to appreciate.';
  diagnosisButton.textContent = 'Scan complete ✓';
  diagnosisButton.disabled = true;
});

chatTrigger.addEventListener('click', () => {
  surpriseMessage.classList.add('show');
  surpriseMessage.textContent = 'Meenu: That is not a question. That is a cry for help. 😂';
  chatTrigger.textContent = 'Message delivered with professional concern ✓';
  chatTrigger.disabled = true;
});

lastSurprise.addEventListener('click', () => {
  finalScreen.classList.add('active');
  finalScreen.setAttribute('aria-hidden', 'false');
  launchConfetti(finalSparkles, 45);
});

function closeFinalScreen() {
  finalScreen.classList.remove('active');
  finalScreen.setAttribute('aria-hidden', 'true');
}
closeFinal.addEventListener('click', closeFinalScreen);

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.photo-button').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.full;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
    closeFinalScreen();
  }
});

musicToggle.addEventListener('click', async () => {
  if (birthdayMusic.paused) {
    try {
      await birthdayMusic.play();
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.querySelector('.music-label').textContent = 'Pause';
    } catch (error) {
      musicToggle.querySelector('.music-label').textContent = 'Add music.mp3';
    }
  } else {
    birthdayMusic.pause();
    musicToggle.setAttribute('aria-pressed', 'false');
    musicToggle.querySelector('.music-label').textContent = 'Music';
  }
});

// Keep the optional audio source easy to replace without changing the controls.
birthdayMusic.src = CONFIG.optionalMusic;
