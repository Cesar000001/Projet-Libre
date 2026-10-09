// Script principal du Bestiaire des Pyrénées.
// Vite le charge depuis index.html, puis suit chaque "import" pour charger le reste.

// Les polices, installées avec npm : elles sont servies par le site lui-même
import '@fontsource-variable/fredoka'
import '@fontsource-variable/nunito'

// Les styles : importer le CSS ici permet à Vite de l'injecter dans la page
import '../styles/main.css'

// GSAP (le moteur d'animation) et son extension ScrollTrigger (animations liées au défilement)
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { creerScene, animerAmbiance } from './scene.js'
import { lancerIntro } from './intro.js'

// Les extensions GSAP doivent être "enregistrées" une fois avant d'être utilisées
gsap.registerPlugin(ScrollTrigger)

// Le visiteur a-t-il demandé à son système de limiter les animations ? On respecte ce choix.
const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const scene = creerScene()

lancerIntro(scene, {
  mouvementReduit,
  // Les animations d'ambiance (nuages, fumée, herbes) démarrent une fois le décor en place
  quandDecorPret: () => {
    if (!mouvementReduit) animerAmbiance(scene)
  },
})
