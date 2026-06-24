import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author by default, but not url and likes', () => {
  const blog =   {
    title: 'How Vitest Works',
    author: 'Bob Schmo',
    url: 'https://bobschmo.com/',
    likes: 5,
    user: {
      username: 'bobby482',
      name: 'Bob The Builder',
      id: '6a2a6de5c8975c5ee31a9179'
    },
    id: '6a2944df425227018a4d686a'
  }
  const user =   {
    username: 'bobby482',
    name: 'Bob The Builder',
    id: '6a2a6de5c8975c5ee31a9179'
  }

  const { container } = render(<Blog user={user} blog={blog} />)

  const defaultDiv = container.querySelector('.default-view')

  expect(defaultDiv).toHaveTextContent(blog.title)
  expect(defaultDiv).toHaveTextContent(blog.author)
  expect(defaultDiv).not.toHaveTextContent(`likes ${blog.likes}`)
  expect(defaultDiv).not.toHaveTextContent(blog.url)
})

test('blog url and likes are shown on button click', async () => {

})