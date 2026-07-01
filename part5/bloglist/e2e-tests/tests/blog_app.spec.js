import { test, expect } from '@playwright/test'

const { describe, beforeEach } = test

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'neil123',
        name: 'Neil Tyson',
        password: 'password12345'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with the correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('neil123')
      await page.getByLabel('password').fill('password12345')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Neil Tyson logged in')).toBeVisible()
    })

    test('fails with the wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('neil123')
      await page.getByLabel('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Neil Tyson logged in')).toBeHidden()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {

    })

    test('a new blog can be created', async ({ page }) => {

    })
  })
})