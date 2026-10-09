// Le décor : construction des calques SVG et petites animations d'ambiance.

import { gsap } from 'gsap'

// "?raw" demande à Vite le contenu texte du fichier SVG, pour l'insérer directement dans la page
// (ainsi, le CSS et GSAP peuvent atteindre chaque forme du dessin).
import symboles from '../assets/decor/symboles.svg?raw'
import ciel from '../assets/decor/ciel.svg?raw'
import montagnes from '../assets/decor/montagnes.svg?raw'
import collines from '../assets/decor/collines.svg?raw'
import plaine from '../assets/decor/plaine.svg?raw'

// Les calques, du plus lointain au plus proche : chacun est dessiné par-dessus le précédent
const calques = [symboles, ciel, montagnes, collines, plaine]

// Insère tous les calques dans la scène et renvoie l'élément de la scène
export function creerScene() {
  const scene = document.querySelector('.scene')
  scene.innerHTML = calques.join('')
  return scene
}

// Lance les animations qui tournent en boucle pour donner de la vie au décor
export function animerAmbiance(scene) {
  // Nuages : un lent va-et-vient, chacun à son rythme et dans son sens
  scene.querySelectorAll('.nuage').forEach((nuage, index) => {
    gsap.to(nuage, {
      x: index % 2 === 0 ? 40 : -40,
      duration: 14 + index * 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  })

  // Halo du soleil qui "respire"
  gsap.to(scene.querySelector('.soleil-halo'), {
    scale: 1.08,
    transformOrigin: '50% 50%',
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })

  // Fumée de la cheminée : chaque bouffée monte, grossit et s'efface, en boucle
  scene.querySelectorAll('.fumee circle').forEach((bouffee, index) => {
    gsap
      .timeline({ repeat: -1, delay: index })
      .fromTo(
        bouffee,
        { y: 0, scale: 0.5, opacity: 0 },
        { y: -50, scale: 1.4, duration: 3, ease: 'none', transformOrigin: '50% 50%' },
      )
      .to(bouffee, { opacity: 0.9, duration: 0.6 }, 0)
      .to(bouffee, { opacity: 0, duration: 1.2 }, 1.8)
  })

  // Hautes herbes qui ondulent au vent, en pivotant depuis leur base
  gsap.fromTo(
    scene.querySelectorAll('.touffe'),
    { rotation: -3 },
    {
      rotation: 3,
      transformOrigin: '50% 100%',
      duration: 2.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.35, from: 'random' },
    },
  )

  // Les oiseaux planent doucement
  gsap.to(scene.querySelector('.oiseaux'), {
    x: 30,
    y: -10,
    duration: 5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
}
