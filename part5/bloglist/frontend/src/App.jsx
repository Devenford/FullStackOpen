import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input 
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const displayUserBlogs = () => (
    <p>{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </p>
  )

  const addBlog = async event => {
    event.preventDefault()

    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNewBlog({title: '', author: '', url: ''})
    }
    catch {
      setErrorMessage('invalid blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const newBlogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input
          type='text' 
          value={newBlog.title} 
          onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
          type='text'
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
          type='text'
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
          />
        </label>
      </div>
      <button type='submit'>create</button>
    </form>
  )

  const displayUserContent = () => (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>Create a new blog </h2>
      {newBlogForm()}
      {displayUserBlogs()}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && displayUserContent()}
    </div>
  )
}

export default App