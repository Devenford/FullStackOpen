import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('renders blog title and author by default, but not url and likes', () => {

  const { container } = render(<Blog user={user} blog={blog} />)

  const defaultDiv = container.querySelector('.default-view')

  expect(defaultDiv).toHaveTextContent(blog.title)
  expect(defaultDiv).toHaveTextContent(blog.author)
  expect(defaultDiv).not.toHaveTextContent(`likes ${blog.likes}`)
  expect(defaultDiv).not.toHaveTextContent(blog.url)
})

describe('blog url and likes are shown on button click', () => {
  beforeEach(() => {
    render(<Blog user={user} blog={blog} />)
  })

  test('at start, the url and likes are not shown', () => {
    const likesElement = screen.getByText(`likes ${blog.likes}`)
    const urlElement = screen.getByText(blog.url)

    expect(likesElement).not.toBeVisible()
    expect(urlElement).not.toBeVisible()
  })

  test('after clicking the view button, the url and likes are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likesElement = screen.getByText(`likes ${blog.likes}`)
    const urlElement = screen.getByText(blog.url)

    expect(likesElement).toBeVisible()
    expect(urlElement).toBeVisible()
  })
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const mockHandler = vi.fn()

  render(<Blog user={user} blog={blog} updateLikes={mockHandler}/>)

  const userSession = userEvent.setup() // you cannot use the variable name "user" here since the render line above calls/references user. Doing so would cause it to call the hoisted, uninitialized userEvent "user" instead, since it's within the local scope and is hoisted.
  const button = screen.getByText('like')
  await userSession.click(button)
  await userSession.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})