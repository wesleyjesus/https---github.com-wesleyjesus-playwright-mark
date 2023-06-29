import { expect, Locator, Page } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"

export class TasksPage {
    readonly page: Page
    readonly inputTask: Locator

    constructor(page: Page){
        this.page = page
        this.inputTask = page.locator('input[class*=InputNewTask]')
    }

    async go() {
        await this.page.goto('http://localhost:3000/')
        
        //aguarda até o seletor ser encontrado na página
        // await this.page.waitForSelector('input[class*=InputNewTask]')
    }

    async create(task: TaskModel){
        await this.inputTask.fill(task.name)
        
        //await page.click('xpath=//button[contains(text(), "Create")]') busca de seletor usando XPATH
        await this.page.click('css=button >> text=Create')
    }

    async toggle(taskName: string) {
        const target = this.page.locator(`//p[text()="${taskName}"]/..//button[contains(@class, "Toggle" )]`)
        await target.click()
    }

    async remove(taskName: string) {
        const target = this.page.locator(`//p[text()="${taskName}"]/..//button[contains(@class, "Delete" )]`)
        await target.click()
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async shouldBeDone(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

    async shouldNotExist(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).not.toBeVisible()
    }


}