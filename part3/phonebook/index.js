const express = require('express')
const app = express()

app.use(express.json())

let entries = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(entries)
})

app.get('/api/info', (request, response) => {
  const time = new Date()
  response.send(`<div>
    <p>Phonebook has info for ${entries.length} people</p>
    <p>${time}</p>
    </div>`)
})

app.get('/api/persons/:id', (request, response) => {
  id = request.params.id
  const entry = entries.find(entry => entry.id === id)
  
  if (entry) {
    response.json(entry)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  id = request.params.id
  entries = entries.filter(entry => entry.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  body = request.body

  if (!body.name) {
    return response.status(400).json({error: 'name missing'})
  }

  if(!body.number) {
    return response.status(400).json({error: 'phone number missing'})
  }

  if(entries.some(entry => entry.name === body.name)) {
    return response.status(400).json({error: 'name must be unique'})
  }

  const entry = {
    "id": String(Math.floor(Math.random() * 100000000000)),
    "name": body.name, 
    "number": body.number
  }

  entries = entries.concat(entry)

  response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
