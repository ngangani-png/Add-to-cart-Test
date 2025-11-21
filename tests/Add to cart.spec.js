const { test, expect } = require("@playwright/test");

test("Website for automation practice ", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Neviget page
  await page.goto("https://automationexercise.com/login");
  await expect(
    page.locator("//*[@class='login-form']//h2", {
      name: "Login to your account",
    })
  ).toBeVisible();

  //Login page
  await page
    .getByPlaceholder("Email Address")
    .first()
    .fill("neelgangani@codewiglet.com");
  await page.getByPlaceholder("Password").fill("Test@123");
  await page.getByRole("button", { name: "Login" }).click();

  //page load

  await page.waitForLoadState("networkidle");
  await expect(
    page.locator(
      "//*[@class='features_items']//h2[@class='title text-center']",
      {
        name: "Features Items",
      }
    )
  ).toBeVisible();

  await page.locator("//*[@href='/product_details/2']").click();

  //Get Product Name
  const product = page.locator("//*[@class='product-information']//h2");
  const productText = await product.innerText();
  console.log(productText);

  // Add to cart
  await page.getByRole("button", { name: "Add to cart" }).click();

  await page.waitForSelector('//*[@class="modal-content"]');
  await expect(
    page
      .locator("//*[@class='text-center']", {
        name: "Your product has been added to cart.",
      })
      .first()
  ).toBeVisible();

  await page.locator("//*[@class='text-center']//a").click();

  //Address Details page

  await page.locator("//*[@class='btn btn-default check_out']").click();

  await page.locator(".form-control").pressSequentially(
    // "You can provide information about where to leave the package if you won't be home, such as 'Please leave on the porch' or 'Call before delivery'",
    "teste",
    { delay: 100 }
  );
  await page.locator("//*[@class='btn btn-default check_out']").click();

  //Payment Details page
  await expect(
    page.locator("//*[@class='step-one']//h2", {
      name: "Payment",
    })
  ).toBeVisible();

  // fill payment details

  await page
    .locator("//*[@name='name_on_card']")
    .pressSequentially("Neel Gangani", { delay: 100 });
  await page
    .locator("//*[@name='card_number']")
    .pressSequentially("1234 5662 1231", { delay: 100 });

  await page.locator("//*[@name='cvc']").fill("213");
  await page.locator("//*[@name='expiry_month']").fill("10");
  await page.locator("//*[@name='expiry_year']").fill("2025");

  await page.getByRole("button", { name: "Pay and Confirm Order" }).click();

  const sucmsg = await page.locator(
    "//*[@class='col-md-12 form-group hide']//div"
  );
  const sucmsghid = await expect(sucmsg).toBeHidden();

  // Order Placed!

  const confirmedmassage = await page
    .locator("//*[@class='col-sm-9 col-sm-offset-1']//p")
    .innerText();

  console.log(confirmedmassage);
});
