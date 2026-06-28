// Récupère l'id dans l'URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

// Charge le JSON et affiche l'enveloppe
fetch('data/envelopes.json')
  .then(res => res.json())
  .then(envelopes => {
    const env = envelopes.find(e => e.id === id);
    if (!env) {
      window.location.href = 'index.html';
      return;
    }

    // Rempli les infos de la lettre
    const dateStr = new Date(env.date).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    document.getElementById('letter-date').textContent = dateStr + ' — ' + env.label;
    document.getElementById('letter-subject').textContent = env.subject;
    document.getElementById('letter-message').textContent = env.message;

    // Met à jour le titre de la page
    document.title = env.subject + ' — Pour Célia';

    // Gestion du clic sur l'enveloppe
    const wrapper = document.getElementById('envelope-wrapper');
    const flap    = document.getElementById('env-flap');
    const seal    = document.getElementById('seal');
    const sealScreen  = document.getElementById('seal-screen');
    const letterScreen = document.getElementById('letter-screen');
    const hint    = document.getElementById('seal-hint');

    let opened = false;

    wrapper.addEventListener('click', () => {
      if (opened) return;
      opened = true;

      // 1. Casse le sceau
      seal.classList.add('breaking');
      hint.style.opacity = '0';

      // 2. Ouvre le rabat
      setTimeout(() => {
        flap.classList.add('open');
      }, 300);

      // 3. Fait disparaître l'enveloppe et apparaître la lettre
      setTimeout(() => {
        sealScreen.classList.add('hidden');
        letterScreen.classList.add('visible');
      }, 1100);
    });
  })
  .catch((err) => {
    console.error('Erreur chargement JSON :', err);
  });