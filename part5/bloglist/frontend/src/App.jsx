import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userLoginObject) => {
    try {
      const user = await loginService.login(userLoginObject)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
    }
    catch(error) {
      setMessage({
        data: 'wrong username or password', className: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      
      throw error
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setMessage({
        data: `A new blog: ${blog.title} by ${blog.author} added`, 
        className: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch {
      setMessage({
        data: 'invalid blog', 
        className: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const displayUserBlogs = () => (
    <p>{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </p>
  )

  const displayUserContent = () => (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlogForm createBlog={addBlog} />
      </Togglable>
      {displayUserBlogs()}
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      {!user && <LoginForm performLogin={handleLogin}/>}
      {user && displayUserContent()}
    </div>
  )
}

export default App