const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to TikTok login page
  await page.goto('https://www.tiktok.com/login', { waitUntil: 'networkidle2' });

  // Allow time to manually log in (or automate this part if possible)
  console.log('Please log in manually. The script will continue in 60 seconds...');
  await page.waitForTimeout(60000);

  // Navigate to the user's following page
  const username = 'uuinqx'; // Replace with your TikTok username
  await page.goto(`https://www.tiktok.com/@${username}/following`, { waitUntil: 'networkidle2' });

  // Scroll down to load more users (adjust the loop count as needed)
  for (let i = 0; i < 80; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await page.waitForTimeout(5000); // Wait for new users to load
  }

  // Locate the unfollow buttons
  const unfollowButtons = await page.$$('button:contains("Following")');
  const unfollowButtonss = await page.$$('button:contains("Friends")');
  // Unfollow each user
  for (const button of unfollowButtons) {
    try {
      await button.click();
      await page.waitForTimeout(2000); // Adjust sleep time as needed to avoid rate limits
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  for (const button of unfollowButtonss) {
    try {
      await button.click();
      await page.waitForTimeout(2000); // Adjust sleep time as needed to avoid rate limits
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  // Close the browser
  await browser.close();
})();

