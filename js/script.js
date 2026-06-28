const envelopes = [
  { date: '2019-09-03', label: 'Notre rencontre',  icon: '🌟', special: true },
  { date: '2026-07-01', label: 'Juillet',           icon: '☀️' },
  { date: '2026-08-01', label: 'Août',              icon: '🌊' },
  { date: '2026-09-03', label: 'Notre rencontre',  icon: '🌟', special: true },
  { date: '2026-10-01', label: 'Octobre',           icon: '🍂' },
  { date: '2026-11-01', label: 'Novembre',          icon: '🕯️' },
  { date: '2026-12-01', label: 'Décembre',          icon: '❄️' },
  { date: '2027-01-01', label: 'Janvier',           icon: '🌙' },
  { date: '2027-02-01', label: 'Février',           icon: '🤍' },
  { date: '2027-03-01', label: 'Mars',              icon: '🌱' },
  { date: '2027-04-18', label: 'Tes 21 ans',        icon: '✨' },
];

const grid = document.getElementById('envelopes-grid');
const today = new Date();
today.setHours(0, 0, 0, 0);

// On garde la date de rencontre 2019 (spéciale) + toutes les dates futures
const visible = envelopes.filter((env) => {
  const unlockDate = new Date(env.date);
  return env.special || unlockDate >= today;
});

visible.forEach((env) => {
  const unlockDate = new Date(env.date);
  const isUnlocked = today >= unlockDate;
  const realIndex = envelopes.indexOf(env);

  const card = document.createElement('a');
  card.href = isUnlocked ? `envelope.html?id=${realIndex}` : '#';
  card.className = 'envelope-card'
    + (isUnlocked ? '' : ' envelope-locked')
    + (env.special ? ' envelope-special' : '');

  if (!isUnlocked) {
    card.addEventListener('click', e => e.preventDefault());
  }

  const dateStr = unlockDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  card.innerHTML = `
    <span class="envelope-icon">${isUnlocked ? env.icon : '🔒'}</span>
    <p class="envelope-date">${dateStr}</p>
    <p class="envelope-label">${env.label}</p>
  `;

  grid.appendChild(card);
});

// Smooth scroll vers les enveloppes
document.querySelector('.hero-cta').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('enveloppes').scrollIntoView({ behavior: 'smooth' });
});