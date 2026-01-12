const container = document.querySelector('.container');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const illustration = document.querySelector('.illustration');

const vh = window.innerHeight;
const horizontalDistance = 26; // vw

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // PHASE 1: horizontal movement (first screen)
  const horizontalProgress = Math.min(scrollY / vh, 1);
  left.style.transform = `translateX(${horizontalProgress * horizontalDistance}vw)`;
  right.style.transform = `translateX(-${horizontalProgress * horizontalDistance}vw)`;
  illustration.style.transform = `translateY(-${horizontalProgress * 100}px)`;
  illustration.style.opacity = 1 - horizontalProgress;

  // PHASE 2: vertical scroll (container moves up and disappears)
  if (horizontalProgress === 1) {
    const verticalScroll = scrollY - vh;
    container.style.transform = `translateY(-${verticalScroll}px)`;
  }
});

// Compteur depuis le 20 oct à 00h = Unequal Pay Day

const unequalPayDay = new Date('2025-10-20T00:00:00'); 
const counterElement = document.getElementById('counter');

function updateCounter() {
  const today = new Date();
  let diff = today - unequalPayDay; // Différence en millisecondes
  
  // On utilise Math.abs (valeur absolue) pour toujours avoir des chiffres positifs
  const absoluteDiff = Math.abs(diff);
  
  const diffDays = Math.floor(absoluteDiff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((absoluteDiff / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((absoluteDiff / (1000 * 60)) % 60);

  if (diff < 0) {
    // AVANT le 20 octobre : Message au futur (Compte à rebours)
    counterElement.innerHTML = `Dans <strong>${diffDays} jours</strong>, <strong>${diffHours} heures</strong> et <strong>${diffMinutes} minutes</strong>, les femmes travailleront gratuitement.`;
  } else {
    // APRÈS le 20 octobre : Message original (Compteur de temps écoulé)
    counterElement.innerHTML = `Depuis <strong>${diffDays} jours</strong>, <strong>${diffHours} heures</strong> et <strong>${diffMinutes} minutes</strong>, les femmes travaillent gratuitement.`;
  }
}

// Mise à jour chaque minute
setInterval(updateCounter, 1000 * 60);
updateCounter();