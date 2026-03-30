require('dotenv').config()
const express = require('express')

const app = express()

const morgan = require('morgan')
morgan.token('entry', (request) => {
  return JSON.stringify(request.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :entry'))
app.use(express.static('dist'))

const Entry = require('./models/entry.js')

// route handlers:
app.get('/api/persons', (request, response, next) => {
  Entry.find({})
    .then(entries => {
      response.json(entries)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Entry.findById(request.params.id)
    .then(entry => {
      if(entry) {
        response.json(entry)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response, next) => {
  const time = new Date()
  Entry.find({})
    .then(entries => {
      response.send(`<div>
    <p>Phonebook has info for ${entries.length} people</p>
    <p>${time}</p>
    </div>`)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  Entry.find({ name: name })
    .then(entries => {
      let entry
      if(entries.length !== 0) {
        entry = entries[0]
        entry.name = name
        entry.number = number
      }
      else {
        entry = new Entry({
          name: name,
          number: number
        })
      }

      return entry.save().then(savedEntry => response.json(savedEntry))
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then(result => {
      if(!result) {
        return response.status(404).end()
      }

      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
