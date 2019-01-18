const express = require('express')
const app = express()
const port = 3000

const players = require('./modules/players')

app.use(express.json())

app.get('/', (req, res) => {
  players.getPlayers()
  .then( players => res.send({ players }) )
  .catch( error => res.json({ error }) )
})

app.get('/serie-a', (req, res) => {
  players.getPlayers('A')
  .then( players => res.send({ players }) )
  .catch( error => res.json({ error }) )
})

app.get('/serie-b', (req, res) => {
  players.getPlayers('B')
  .then( players => res.send({ players }) )
  .catch( error => res.json({ error }) )
})

app.listen(port, () => console.log(`Running at port ${3000}`))
