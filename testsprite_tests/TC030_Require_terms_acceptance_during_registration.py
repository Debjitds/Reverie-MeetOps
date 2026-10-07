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
        
        # -> Click the 'Get Started' button/link to open the registration page.
        # Get Started link
        elem = page.get_by_role("navigation").get_by_role("link", name="Get Started")
        await elem.click(timeout=10000)
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) and click the 'Register' button without checking 'I agree to the User Agreement and Privacy Policy'.
        # Enter your full name text field
        elem = page.get_by_role("textbox", name="Full Name *")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Debjit Sarkar")
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) and click the 'Register' button without checking 'I agree to the User Agreement and Privacy Policy'.
        # Letters, numbers, and underscores only text field
        elem = page.get_by_role("textbox", name="Username *")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("debjitchsarkarofficial2003")
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) and click the 'Register' button without checking 'I agree to the User Agreement and Privacy Policy'.
        # At least 8 characters with letters and numbers password field
        elem = page.get_by_role("textbox", name="Password *", exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) and click the 'Register' button without checking 'I agree to the User Agreement and Privacy Policy'.
        # Re-enter password password field
        elem = page.get_by_role("textbox", name="Confirm Password *")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) and click the 'Register' button without checking 'I agree to the User Agreement and Privacy Policy'.
        # Register button
        elem = page.get_by_role("button", name="Register")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A terms acceptance validation message saying "Please agree to the User Agreement and Privacy Policy" is visible on the page.
        # Assert-outcome: passed
        # Assert: Terms acceptance validation message is visible with the expected text.
        await expect(page.locator("xpath=/html/body/div[1]/section/ol/li").nth(0)).to_have_text("Please agree to the User Agreement and Privacy Policy", timeout=15000), "Terms acceptance validation message is visible with the expected text."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    