import { test, expect } from '@playwright/test'

test.describe('AKU Pferd Weiterführende Artikel', () => {
  test('cards navigate to their detail pages', async ({ page }) => {
    await page.goto('/aku-pferd')

    const relatedArticle = page.getByRole('link', { name: /AKU Ablauf verstehen/i })
    await expect(relatedArticle).toBeVisible()

    await relatedArticle.click()

    await expect(page).toHaveURL(/\/aku-pferd-ablauf$/)
    await expect(page.getByRole('heading', { name: /AKU Ablauf/i })).toBeVisible()
  })
})
