const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')    // object destructuring

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const { title, author, url, likes } = request.body
  const blogToBeUpdated = await Blog.findById(request.params.id)

  if (!blogToBeUpdated) {
    return response.status(404).json({ error: 'blog does not exist' })
  }

  if (blogToBeUpdated.user.toString() !== user._id.toString()) // you require .toString(), since .user and ._id return ObjectId and === compares objects by reference
  {
    return response.status(403).json({ error: 'forbidden updation' })
  }

  blogToBeUpdated.title = title
  blogToBeUpdated.author = author
  blogToBeUpdated.url = url
  blogToBeUpdated.likes = likes

  const updatedBlog = await blogToBeUpdated.save()
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog does not exist' })
  }

  if (blog.user.toString() !== user._id.toString()) // you require .toString(), since .user and ._id return ObjectId and === compares objects by reference
  {
    return response.status(403).json({ error: 'forbidden deletion' })
  }

  await blog.deleteOne()
  response.status(204).end()
})

module.exports = blogsRouter