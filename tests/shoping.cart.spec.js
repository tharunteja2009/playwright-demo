import { test, expect } from '@playwright/test';
import { signup } from './page/signup.page.js';
import { login } from './page/login.page.js';
import { products } from './page/products.page.js';

const BASE_URL = "https://www.demoblaze.com";
const generateCredentials = () => {
    const timestamp = Date.now();
    return { username: `user${timestamp}`, password: `pass${timestamp}` };
};

test.describe("E2E Flow", () => {
    let username, password;

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    });

    test("Sign Up and Login Flow", async ({ page }) => {
        const creds = generateCredentials();
        username = creds.username;
        password = creds.password;

        const signupPage = new signup(page);
        const loginPage = new login(page);

        try {
            await signupPage.doSignUp(username, password);
            console.log(`Sign up successful for user: ${username}`);

            await loginPage.doLogin(username, password);
            console.log(`Login successful for user: ${username}`);

        } catch (error) {
            console.error(`Test failed: ${error.message}`);
            throw error;
        }
    });

    test("Add to Cart Flow", async ({ page }) => {
        if (!username || !password) {
            throw new Error("Test requires valid credentials. Run Sign Up test first.");
        }

        const productPage = new products(page);
        const loginPage = new login(page);

        try {
            await loginPage.doLogin(username, password);
            console.log(`Login successful for user: ${username}`);

            const productName = "Samsung galaxy s6";
            const quantity = 2;

            await productPage.addToCart(productName, quantity);
            console.log(`Added ${quantity}x ${productName} to the cart.`);

            await productPage.validateCart(productName, quantity);
            console.log("Cart validation successful.");

        } catch (error) {
            console.error(`Test failed: ${error.message}`);
            throw error;
        }
    });
});