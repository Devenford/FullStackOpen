const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxBlog, blog) => blog.likes > maxBlog.likes ? blog : maxBlog)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}