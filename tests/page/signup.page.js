import { test, expect } from '@playwright/test';

export class signup {
    constructor(page) {
        this.page = page;
    }

    async doSignUp(username, password) {
        await expect(this.page).toHaveTitle("STORE");
        await this.page.locator("#signin2").click();
        await this.page.locator("#sign-username").fill(username);
        await this.page.locator("#sign-password").fill(password);
        await this.page.locator("//div[@id='signInModal']//button[text()='Sign up']").click();
        this.page.on('dialog', dailog => dailog.accept());
    }

}

module.exports = { signup };