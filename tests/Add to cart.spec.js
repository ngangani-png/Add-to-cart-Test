const { test, expect } = require("@playwright/test");

// Fast Login
async function fastLogin(page) {
  await page.goto("https://automationexercise.com/login");
  await page
    .getByPlaceholder("email", { name: "email" })
    .first()
    .fill("neelgangani@codewiglet.com");
  await page.getByPlaceholder("Password").fill("Test@123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("domcontentloaded");
}

// View product
async function openProductByIndex(page) {
  await expect(
    page.getByRole("heading", { name: "Features Items" })
  ).toBeVisible();

  await page.getByRole("link", { name: "View Product" }).nth(1).click();
}

// Add to cart
async function addToCart(page) {
  const product = await page.getByRole("heading", { name: "Men Tshirt" });
  const productText = await product.textContent();
  console.log(productText);
  await page.getByRole("button", { name: "Add to cart" }).click();

  await page.waitForSelector(".modal-content");
  await expect(
    page
      .locator(".text-center", {
        name: "Your product has been added to cart.",
      })
      .first()
  ).toBeVisible();

  await page.getByRole("link", { name: "View Cart" }).click();
}

//Checkout
async function proceedCheckout(page) {
  await page.locator(".btn-default.check_out").click();

  await page
    .locator(".form-control")
    .fill("Please leave on porch. Call if needed.");
  await page.getByRole("link", { name: "Place Order" }).click();
}

// Fill Payment Details
async function fillPayment(page) {
  await page.locator("[data-qa='name-on-card']").fill("Neel");
  await page.locator("[data-qa='card-number']").fill("1234 5662 1231");
  await page.getByPlaceholder("ex. 311").fill("311");
  await page.getByPlaceholder("MM").fill("10");
  await page.getByPlaceholder("YYYY").fill("2026");
  await page.getByRole("button", { name: "Pay and Confirm Order" }).click();
  await expect(page.locator(".alert-success")).toBeHidden();

  return await page
    .getByText("Congratulations! Your order has been confirmed!")
    .textContent();
}

// Login (1)
test("View Product Page", async ({ page }) => {
  await fastLogin(page);
  await openProductByIndex(page);
});

// Add to cart (2)
test("Add Product to Cart", async ({ page }) => {
  await fastLogin(page);
  await openProductByIndex(page);
  await addToCart(page);
});

// Add Payment (3)
test("Final Payment Fill", async ({ page }) => {
  await fastLogin(page);
  await openProductByIndex(page);
  await addToCart(page);
  await proceedCheckout(page);
  const confirmationMsg = await fillPayment(page);
  console.log("Order Confirmation:", confirmationMsg);
});
