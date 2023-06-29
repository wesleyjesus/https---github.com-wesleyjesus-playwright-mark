import { test, expect } from "@playwright/test"

test('web app deve esta online ', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')
});