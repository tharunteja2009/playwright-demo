import { test, expect } from '@playwright/test';

export class products {
    constructor(page) {
        this.page = page;
    }

    async addToCart(productName, quantity) {
        console.log(`Adding product: ${productName} with quantity: ${quantity}`);

        // Wait until the page is loaded and the DOM is ready
        await this.page.waitForLoadState("domcontentloaded");

        const productNames = await this.page.locator("H4.card-title");
        const numberOfProducts = await productNames.count();
        let productFound = false;
        // Search for the product by name
        for (let i = 0; i < numberOfProducts; i++) {
            const productTitle = await productNames.nth(i).textContent();
            if (productTitle.trim() == productName) {
                console.log(`We found the product with name ${productTitle} !!!!!`);
                await productNames.nth(i).click();
                // Wait for the page to navigate or update
                await this.page.waitForLoadState("domcontentloaded");
                productFound = true;
                break;
            }
        }

        // If product is not found, log and return
        if (!productFound) {
            console.log(`Product with name ${productName} not found.`);
            return;
        }
        console.log(`Adding product to cart ${quantity} times.`);

        // Handle the dialog if it appears


        // Click the add-to-cart button the specified number of times
        const addToCartButton = this.page.locator("a[onclick='addToCart(1)']");

        while (quantity > 0) {
            // Wait for the add-to-cart button to be visible and enabled before clicking
            await addToCartButton.waitFor({ state: 'visible' });
            await addToCartButton.click();
            await this.page.waitForTimeout(3000);
            quantity--;
            this.page.on('dialog', async (dialog) => {
                console.log(`Dialog message: ${dialog.message()}`);
                await dialog.accept();
            });
        }
    }


    async validateCart(productName, quantity) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator("#cartur").click(); // Navigate to cart

        // Ensure the page actually navigated to the cart
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000); // Small wait for cart update (Optional)

        // Ensure cart items are loaded
        await this.page.waitForSelector("tr.success", { timeout: 5000 });

        const cartList = await this.page.locator("tr.success");
        const actualQuantity = await cartList.count();
        console.log(`actual product quantity : ${actualQuantity}`);
        console.log(`expected product quantity :  ${quantity}`);
        expect(actualQuantity).toEqual(quantity);
        // Validate product name in the cart
        for (let i = 0; i < actualQuantity; i++) {
            const cartProductName = await cartList.nth(i).locator("td").nth(1).textContent();
            console.log(`Found in cart: ${cartProductName.trim()}`);
            expect(cartProductName.trim()).toContain(productName);
        }

        console.log("Cart validation successful.");
    }

}

module.exports = { products };