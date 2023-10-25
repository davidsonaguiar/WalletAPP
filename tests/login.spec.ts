import { test, expect } from '@playwright/test';

const URL = "http://localhost:5173/login";


test("Should have 2 inputs", async ({ page }) => {

  await page.goto(URL);
  expect(page.getByRole("textbox", { name: "login" })).toBeTruthy();
  expect(page.getByRole("textbox", { name: "password" })).toBeTruthy();

});


test("Should have 2 label", async ({ page }) => {

  await page.goto(URL);
  expect(page.getAttribute("label", "login")).toBeTruthy();
  expect(page.getAttribute("label", "password")).toBeTruthy();

});

test("Should App Page", async ({ page }) => {

  await page.goto(URL);

  const inputLogin = await page.$("#login");
  inputLogin?.fill("davidson");

  const inputPassword = await page.$("#password");
  inputPassword?.fill("davidson");

  await page.waitForTimeout(2000)
  inputPassword?.press("Enter");

  expect(inputLogin).toBeTruthy();

});