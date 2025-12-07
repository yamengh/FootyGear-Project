const { test, expect } = require('@playwright/test');
const path = require('path');

test('Check FootyGear Store products and take screenshot', async ({ page }) => {
  
  const filePath = 'file://' + path.resolve(__dirname, '../../src/main/resources/football_store.html');
  await page.goto(filePath);

  
  const products = page.locator('.product');
  await expect(products).toHaveCount(3);

 
  await expect(products.nth(0).locator('.product-name')).toHaveText('Football Shoes');


  await page.screenshot({ 
    path: path.resolve(__dirname, 'footygear_screenshot.png'), 
    fullPage: true 
  });
});
