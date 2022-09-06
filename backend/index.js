const express = require('express')
const app = express()
// Habilitar el response.body
app.use(express.json())

let notas = [
  {
    id: 1,
    content: 'Primera nota del contenido',
    date: '2019-05-30T18:39:34',
    important: false
  },
  {
    id: 2,
    content: 'segunda nota',
    date: '2019-05-30T18:39:34',
    important: true
  },
  {
    id: 3,
    content: 'tercera nota',
    date: '2019-05-30T18:39:34',
    important: false
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notas)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notas.find((note) => note.id === id)
  note ? response.json(note) : response.status(404).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'Content is missing',
    })
  }

  const ids = notas.map((note) => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important:
      typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
  }
  notas = [...notas, newNote]
  response.status(201).json(newNote)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notas = notas.filter((note) => note.id !== id)
  console.log(notas)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
