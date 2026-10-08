// Script principal du Bestiaire des Pyrénées.
// Vite le charge depuis index.html, puis suit chaque "import" pour charger le reste.

// Les styles : importer le CSS ici permet à Vite de l'injecter dans la page
import '../styles/main.css'

// GSAP (le moteur d'animation) et son extension ScrollTrigger (animations liées au scroll)
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Les extensions GSAP doivent être "enregistrées" une fois avant d'être utilisées
gsap.registerPlugin(ScrollTrigger)

console.log(`✅ Bestiaire des Pyrénées : site chargé, GSAP ${gsap.version} prêt.`)

// Test de fonctionnement : le titre apparaît en fondu.
// gsap.from() part de l'état indiqué (opacité 0) et revient à l'état normal défini par le CSS.
gsap.from('.titre-principal', {
  opacity: 0,
  duration: 1.5,
  ease: 'power2.out',
})
