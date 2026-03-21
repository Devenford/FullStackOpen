require('dotenv').config()
const express = require('express')

const app = express()

const morgan = require('morgan')
morgan.token('entry', (request, response) => {
  return JSON.stringify(request.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :entry'))
app.use(express.static('dist'))

const Entry = require('./models/entry.js')

// route handlers:
app.get('/api/persons', (request, response) => {
    Entry.find({}).then(entries => {
      response.json(entries)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Entry.findById(request.params.id)
  .then(entry => response.json(entry))
  .catch(error => {
    console.log('error finding person by id: ', error)
    response.status(404).end()
  })
})

app.post('/api/persons', (request, response) => {
  body = request.body

  if (!body.name) {
    return response.status(400).json({error: 'name missing'})
  }

  if(!body.number) {
    return response.status(400).json({error: 'phone number missing'})
  }

  /*
  if(entries.some(entry => entry.name === body.name)) {
    return response.status(400).json({error: 'name must be unique'})
  }
  */

  const entry = new Entry({
    name: body.name,
    number: body.number
  })

  entry.save().then(savedEntry => response.json(savedEntry))
})

/*
app.get('/api/info', (request, response) => {
  const time = new Date()
  response.send(`<div>
    <p>Phonebook has info for ${entries.length} people</p>
    <p>${time}</p>
    </div>`)
})

app.delete('/api/persons/:id', (request, response) => {
  id = request.params.id
  entries = entries.filter(entry => entry.id !== id)
  response.status(204).end()
})
*/

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
