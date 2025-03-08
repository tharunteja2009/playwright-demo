import { test, expect } from '@playwright/test';

export class login {
    constructor(page) {
        this.page = page;
    }

    async doLogin(username, password) {
        await this.page.locator("#login2").click();
        await this.page.locator("#loginusername").fill(username);
        await this.page.locator("#loginpassword").fill(password);
        await this.page.locator("//button[text()='Log in']").click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator("#nameofuser")).toContainText(username);
    }

}

module.exports = { login };