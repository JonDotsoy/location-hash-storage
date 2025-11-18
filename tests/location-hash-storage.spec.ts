import { test, expect } from "@playwright/test";

test("should add item to URL hash", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(`LocationHashStorage.setItem("foo", "taz")`);

  const u1 = page.url();
  expect(u1).toContain("foo=taz");
});

test("should preserve existing hash parameters when adding new item", async ({
  page,
}) => {
  await page.goto("/#boo=biz");

  await page.evaluate(`LocationHashStorage.setItem("foo", "taz")`);
  const booValue = await page.evaluate(`LocationHashStorage.getItem("boo")`);

  const url = page.url();
  expect(url).toContain("foo=taz");
  expect(url).toContain("boo=biz");
  expect(booValue).toEqual("biz");
});

test("should handle multiple items and remove specific item from URL hash", async ({
  page,
}) => {
  await page.goto("/#boo=biz");

  await page.evaluate(`LocationHashStorage.setItem("foo", "taz")`);

  expect(page.url()).toContain("foo=taz");
  expect(page.url()).toContain("boo=biz");

  await page.goto(`${page.url()}&bliz=fazzy`);

  const blizValue = await page.evaluate(`LocationHashStorage.getItem("bliz")`);

  expect(page.url()).toContain("foo=taz");
  expect(page.url()).toContain("boo=biz");
  expect(page.url()).toContain("bliz=fazzy");
  expect(blizValue).toEqual("fazzy");

  await page.evaluate(`LocationHashStorage.removeItem("boo")`);

  expect(page.url()).toContain("foo=taz");
  expect(page.url()).not.toContain("boo=biz");
  expect(page.url()).toContain("bliz=fazzy");
});
