// L'introduction : le décor se construit, le panneau de présentation apparaît,
// puis le bouton "Débuter l'aventure" libère le défilement.

import { gsap } from 'gsap'

// Découpe le titre en lettres (pour les animer une à une) en gardant les mots entiers.
// Le titre complet reste lisible par les lecteurs d'écran grâce à aria-label.
function decouperEnLettres(titre) {
  const texte = titre.textContent.trim()
  titre.setAttribute('aria-label', texte)
  titre.innerHTML = texte
    .split(' ')
    .map((mot) => {
      const lettres = [...mot].map((lettre) => `<span class="lettre">${lettre}</span>`).join('')
      return `<span class="mot" aria-hidden="true">${lettres}</span>`
    })
    .join(' ')
  return titre.querySelectorAll('.lettre')
}

// Construit la séquence d'arrivée : le paysage se monte, puis le panneau se présente
function animerArrivee(scene, elements) {
  const { panneau, lettres, texte, action } = elements
  const choisir = (selecteur) => scene.querySelectorAll(selecteur)

  return (
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      // Le soleil se lève et les calques montent l'un après l'autre
      .from(choisir('.soleil'), { y: 220, duration: 1.3, ease: 'back.out(1.4)' }, 0)
      .from(choisir('.calque-montagnes'), { yPercent: 40, duration: 1.4 }, 0)
      .from(choisir('.calque-collines'), { yPercent: 30, duration: 1.3 }, 0.15)
      .from(choisir('.calque-plaine'), { yPercent: 25, duration: 1.2 }, 0.3)
      .from(choisir('.nuage'), { opacity: 0, x: (index) => (index % 2 === 0 ? -150 : 150), duration: 1.6 }, 0.4)
      // Les petits détails "poussent" dans la plaine
      .from(choisir('.maison'), { scale: 0, transformOrigin: '50% 100%', duration: 0.8, ease: 'back.out(2)' }, 1)
      .from(choisir('.arbres use, .calque-collines use'), { scale: 0, transformOrigin: '50% 100%', duration: 0.6, ease: 'back.out(2)', stagger: 0.06 }, 1.1)
      .from(choisir('.cloture'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.5 }, 1.3)
      .from(choisir('.panneau'), { rotation: -12, scale: 0, transformOrigin: '50% 100%', duration: 0.7, ease: 'back.out(2)' }, 1.4)
      .from(choisir('.bottes use'), { x: '-=80', rotation: -200, opacity: 0, duration: 0.9, stagger: 0.1 }, 1.4)
      .from(choisir('.fleurs use'), { scale: 0, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)', stagger: 0.03 }, 1.5)
      .from(choisir('.touffe'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.5, stagger: 0.08 }, 1.5)
      .from(choisir('.oiseaux'), { opacity: 0, x: -60, duration: 1.2 }, 1.5)
      // Le panneau de présentation, puis le titre lettre par lettre, le texte et le bouton
      .to(panneau, { autoAlpha: 1, duration: 0.01 }, 1.7)
      .from(panneau, { scale: 0.85, y: 30, duration: 0.8, ease: 'back.out(1.6)' }, 1.7)
      .from(lettres, {
        y: -40,
        opacity: 0,
        rotation: () => gsap.utils.random(-25, 25),
        duration: 0.6,
        ease: 'back.out(2.5)',
        stagger: 0.03,
      }, 1.9)
      .from(texte, { y: 15, opacity: 0, duration: 0.6 }, '-=0.3')
      .from(action, { scale: 0, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.2')
  )
}

// Lance l'introduction.
// quandDecorPret : fonction appelée quand le décor est en place (pour démarrer l'ambiance).
export function lancerIntro(scene, { mouvementReduit, quandDecorPret }) {
  const intro = document.querySelector('.intro')
  const panneau = intro.querySelector('.intro-panneau')
  const texte = intro.querySelector('.intro-texte')
  const action = intro.querySelector('.intro-action')
  const bouton = intro.querySelector('.bouton')
  const indice = document.querySelector('.indice')
  const lettres = decouperEnLettres(intro.querySelector('.intro-titre'))

  // Tant que l'aventure n'a pas commencé, la page ne défile pas
  document.documentElement.classList.add('defilement-bloque')

  let pulsation = null

  if (mouvementReduit) {
    // Animations réduites : tout est affiché directement
    gsap.set(panneau, { autoAlpha: 1 })
    quandDecorPret()
  } else {
    animerArrivee(scene, { panneau, lettres, texte, action }).add(() => {
      quandDecorPret()
      // Le bouton "respire" doucement pour attirer l'œil
      pulsation = gsap.to(action, { scale: 1.06, duration: 0.8, ease: 'sine.inOut', repeat: -1, yoyo: true })
    })
  }

  bouton.addEventListener('click', () => {
    bouton.disabled = true
    if (pulsation) pulsation.kill()

    // Fin de l'introduction : on cache le panneau et on autorise le défilement
    const terminer = () => {
      intro.hidden = true
      document.documentElement.classList.remove('defilement-bloque')
    }

    if (mouvementReduit) {
      terminer()
      gsap.set(indice, { autoAlpha: 1 })
      return
    }

    gsap
      .timeline()
      .to(panneau, { y: -80, autoAlpha: 0, duration: 0.6, ease: 'back.in(1.6)' })
      .add(terminer)
      .fromTo(indice, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'back.out(2)' })
      // La petite flèche rebondit pour inviter à faire défiler
      .to(indice.querySelector('svg'), { y: 4, duration: 0.6, ease: 'sine.inOut', repeat: -1, yoyo: true })
  })
}
