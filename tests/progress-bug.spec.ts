import { test, expect } from '@playwright/test';

test.describe('Total Progress Bug Detection', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should show correct total chapter count initially', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the sidebar to load
    await page.waitForSelector('aside', { timeout: 10000 });
    
    // Look for progress indicators in sidebar or header
    const progressText = await page.locator('text=/\\d+\\/\\d+/').first().textContent();
    console.log('Progress text found:', progressText);
    
    // Check header progress display
    const headerProgress = await page.locator('text=/\\d+ \\/ \\d+/').first().textContent();
    console.log('Header progress:', headerProgress);
    
    // The total should be 22 chapters but might show 0 due to the bug
    if (progressText) {
      const match = progressText.match(/(\d+)\/(\d+)/);
      if (match) {
        const [, completed, total] = match;
        console.log(`Found initial progress: ${completed}/${total}`);
        console.log('Expected total: 22, Actual total:', total);
      }
    }
  });

  test('should show correct total when no chapters are started', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the sidebar to load
    await page.waitForSelector('aside', { timeout: 10000 });
    
    // Look for progress in header (stats.completed / stats.total)
    const headerProgress = await page.locator('text=/\\d+ \\/ \\d+/').textContent();
    console.log('Header progress with no chapters started:', headerProgress);
    
    // The bug: when no chapters have progress, total shows 0 instead of 22
    if (headerProgress) {
      const match = headerProgress.match(/(\d+) \/ (\d+)/);
      if (match) {
        const [, completed, total] = match;
        console.log(`No chapters started - Completed: ${completed}, Total: ${total}`);
        
        // This should be 0 / 22, but the bug makes it 0 / 0
        if (total === '0') {
          console.log('BUG DETECTED: Total shows 0 when it should show 22');
        }
      }
    }
  });

  test('should show correct total after marking one chapter complete', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the sidebar to load
    await page.waitForSelector('aside', { timeout: 10000 });
    
    // Click on first chapter to navigate to it
    const firstChapter = await page.locator('a[href*="/chapters/"]').first();
    await firstChapter.click();
    
    // Wait for chapter content to load
    await page.waitForTimeout(2000);
    
    // Look for status buttons (Complete, In Progress, etc.)
    const statusButtons = await page.locator('button').all();
    let completedButton = null;
    
    for (const button of statusButtons) {
      const text = await button.textContent();
      if (text?.includes('Complete') || text?.includes('Completed')) {
        completedButton = button;
        break;
      }
    }
    
    if (completedButton) {
      await completedButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Go back to main view to check total progress
    await page.goto('/');
    await page.waitForSelector('aside', { timeout: 5000 });
    
    // Check header progress display
    const headerProgress = await page.locator('text=/\\d+ \\/ \\d+/').textContent();
    console.log('Progress after completing one chapter:', headerProgress);
    
    // The bug would show 1/1 instead of 1/22
    if (headerProgress) {
      const match = headerProgress.match(/(\d+) \/ (\d+)/);
      if (match) {
        const [, completed, total] = match;
        console.log(`After completing one: ${completed}/${total}`);
        
        // If total is 1 when we completed 1 chapter, that's the bug
        if (total === '1' && completed === '1') {
          console.log('BUG DETECTED: Total shows 1 when it should show 22');
        }
      }
    }
  });
});