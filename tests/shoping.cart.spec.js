import { test, expect } from '@playwright/test';
import { signup } from './page/signup.page.js';
import { login } from './page/login.page.js';
import { products } from './page/products.page.js';

test("Sign in Flow", async ({ page }) => {
    const username = "user" + Date.now();
    const password = "pass" + Date.now();
    await page.goto("https://www.demoblaze.com");
    const signupPage = new signup(page);
    const loginpage = new login(page);
    await signupPage.doSignUp(username, password);
    console.log("Sign up successfully done for user {}", username);
    await loginpage.doLogin(username, password);
    console.log("login successfulfor user {}", username);
});

test("Add to Cart flow", async ({ page }) => {
    await page.goto('https://www.demoblaze.com', {
        waitUntil: 'domcontentloaded',
    });
    const username = "user1741248210752";
    const password = "pass1741248210752";
    const productName = "Samsung galaxy s6";
    const quantity = 3;
    const loginPage = new login(page);
    await loginPage.doLogin(username, password);
    console.log("login successfulfor user {}", username);

    const productPage = new products(page);
    productPage.addToCart(productName, quantity);
    productPage.validateCart(productName, quantity);
});