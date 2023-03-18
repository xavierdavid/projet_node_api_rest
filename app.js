// Importation du paquet Express
const express = require('express')

// Importation du middleware morgan
const morgan = require('morgan')

// Importation du middleware serve-favicon
const favicon = require('serve-favicon')

// Importation de la liste des pokemons
let pokemons = require('./mock-pokemon')

// Importation du module helper
const {success} = require('./helper.js')

// Création d'une instance d'une application Express
const app = express()

// Initialisation d'une constante indiquant la valeur du port à utiliser pour démarrer l'application
const port = 3000

// Combinaison et utilisation des middlewares   
app
  // Middleware favicon ajoutant une favicon sur les réponses
  .use(favicon(__dirname + '/favicon.ico'))
  // Middleware morgan affichant les requêtes entrantes
  .use(morgan('dev'))

// Point de terminaison racine
app.get('/',(req,res) => res.send("Hello, Express 2 !"))

// Point de terminaison permettant de retourner la liste de tous les objets pokemons
app.get('/api/pokemons', (req, res) => {
  const message = "La liste des pokemons a bien été récupérée."
  res.json(success(message, pokemons))
})

// Point de terminaison permettant de retourner un objet pokemon en fonction de son identifiant
app.get('/api/pokemons/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = "Un pokemon a bien été trouvé."
  res.json(success(message,pokemon))
})

// Démarrage de l'application sur le port 3000 et affichage d'un message de confirmation dans le terminal
app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))