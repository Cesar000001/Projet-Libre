// Script de la page de travail "charte graphique".
// Les pastilles de couleur sont lues directement dans variables.css :
// si on modifie une couleur là-bas, cette page se met à jour toute seule.

import '../styles/charte-graphique.css'

// Familles de couleurs : nom affiché, rôle dans le décor, variables CSS correspondantes
const familles = [
  { nom: 'Ciel', role: 'Le fond du ciel, plus soutenu en altitude', variables: ['--ciel-clair', '--ciel', '--ciel-fonce'] },
  { nom: 'Nuages et neige', role: 'Nuages, sommets enneigés, fond des cartes', variables: ['--nuage', '--nuage-ombre'] },
  { nom: 'Herbe', role: 'Prairies, arbres, feuillages', variables: ['--herbe-clair', '--herbe', '--herbe-fonce'] },
  { nom: 'Champs', role: 'Cultures de la plaine, fleurs, soleil', variables: ['--champ-clair', '--champ', '--champ-fonce'] },
  { nom: 'Roche', role: 'Falaises, rochers, grottes', variables: ['--roche-clair', '--roche', '--roche-fonce'] },
  { nom: 'Accent', role: 'Bulles « ? » et boutons', variables: ['--accent', '--accent-fonce'] },
  { nom: 'Texte', role: 'Titres, textes et contours', variables: ['--texte', '--texte-doux'] },
]

// Les valeurs réelles des variables, telles que le navigateur les a lues
const styles = getComputedStyle(document.documentElement)
const palette = document.querySelector('#palette')

for (const famille of familles) {
  const pastilles = famille.variables
    .map((variable) => {
      const hex = styles.getPropertyValue(variable).trim()
      return `
        <li class="pastille">
          <span class="pastille-couleur" style="background: var(${variable})"></span>
          <code>${variable}</code>
          <span class="pastille-hex">${hex}</span>
        </li>`
    })
    .join('')

  const bloc = document.createElement('article')
  bloc.className = 'famille'
  bloc.innerHTML = `
    <h3>${famille.nom}</h3>
    <p>${famille.role}</p>
    <ul class="pastilles">${pastilles}</ul>`
  palette.append(bloc)
}
