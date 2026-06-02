const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blogToBeUpdated = await Blog.findById(request.params.id)

  if (!blogToBeUpdated) {
    return response.status(404).end()
  }

  blogToBeUpdated.title = title
  blogToBeUpdated.author = author
  blogToBeUpdated.url = url
  blogToBeUpdated.likes = likes

  const updatedBlog = await blogToBeUpdated.save()
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)

  if (!result) {
    return response.status(404).end()
  }

  response.status(204).end()
})

module.exports = blogsRouter