import { useState } from 'react'

const Blog = ({ user, blog, updateLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemoveButton = { display: user.id === blog.user.id ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className='default-view'>
        {blog.title} -{blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div className='expanded-view' style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => updateLikes(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={() => deleteBlog(blog)} style={showRemoveButton} >remove</button>
      </div>
    </div>
  )
}

export default Blog