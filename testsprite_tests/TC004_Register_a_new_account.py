import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:5173")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Open the 'Register' page
        await page.goto("http://localhost:5173/register")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Fill the 'FULL NAME', 'USERNAME', 'PASSWORD', and 'CONFIRM PASSWORD' fields and check 'I agree to the User Agreement and Privacy Policy'.
        # Enter your full name text field
        elem = page.locator('[id="name"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Debjit Sarkar")
        
        # -> Fill the 'FULL NAME', 'USERNAME', 'PASSWORD', and 'CONFIRM PASSWORD' fields and check 'I agree to the User Agreement and Privacy Policy'.
        # Letters, numbers, and underscores only text field
        elem = page.locator('[id="username"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("debjitchsarkarofficial2003")
        
        # -> Fill the 'FULL NAME', 'USERNAME', 'PASSWORD', and 'CONFIRM PASSWORD' fields and check 'I agree to the User Agreement and Privacy Policy'.
        # At least 8 characters with letters and numbers password field
        elem = page.locator('[id="password"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the 'FULL NAME', 'USERNAME', 'PASSWORD', and 'CONFIRM PASSWORD' fields and check 'I agree to the User Agreement and Privacy Policy'.
        # Re-enter password password field
        elem = page.locator('[id="confirm-password"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the 'FULL NAME', 'USERNAME', 'PASSWORD', and 'CONFIRM PASSWORD' fields and check 'I agree to the User Agreement and Privacy Policy'.
        # button
        elem = page.locator('[id="terms"]')
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button to submit the registration form and reach the authenticated app.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button to submit the form and verify the authenticated app (dashboard/welcome or a 'Logout' link) appears.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Search the registration page for visible validation or error messages (look for 'already', 'error', 'username', 'taken') and if none clearly blocks submission, click the 'Register' button one final time.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Replace the Username field with a new unique value and click the 'Register' button to attempt account creation with a different username.
        # Letters, numbers, and underscores only text field
        elem = page.locator('[id="username"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("debjitchsarkarofficial2003_1")
        
        # -> Replace the Username field with a new unique value and click the 'Register' button to attempt account creation with a different username.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The authenticated dashboard is displayed and a Logout control is present indicating an authenticated session.
        await page.locator("xpath=/html/body/div[1]/div/main/div/aside/div/nav/a[1]").nth(0).scroll_into_view_if_needed()
        # Assert-outcome: passed
        # Assert: Dashboard navigation link is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/aside/div/nav/a[1]").nth(0)).to_be_visible(timeout=15000), "Dashboard navigation link is visible."
        # Assert-outcome: passed
        # Assert: A Logout button (session control) with title 'Logout' is present.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div/header/div/div[3]/div/button").nth(0)).to_have_attribute("title", "Logout", timeout=15000), "A Logout button (session control) with title 'Logout' is present."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    