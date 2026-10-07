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
        
        # -> Click the 'Login' link to open the Login page.
        # Login link
        elem = page.get_by_role("navigation").get_by_role("link", name="Login")
        await elem.click(timeout=10000)
        
        # -> Fill the username and password fields and click the 'Login' button to submit the login form.
        # Enter username text field
        elem = page.get_by_role("textbox", name="Username")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("debjitchsarkarofficial2003")
        
        # -> Fill the username and password fields and click the 'Login' button to submit the login form.
        # Enter password password field
        elem = page.get_by_role("textbox", name="Password")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the username and password fields and click the 'Login' button to submit the login form.
        # Login button
        elem = page.get_by_role("button", name="Login")
        await elem.click(timeout=10000)
        
        # -> Click the 'Bookings' link in the left navigation to open the Bookings page.
        # Bookings link
        elem = page.get_by_role("link", name="Bookings", exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the 'All Statuses' status filter dropdown so its options appear.
        # All Statuses button
        elem = page.get_by_role("combobox").filter(has_text="All Statuses")
        await elem.click(timeout=10000)
        
        # -> Select the 'Pending' option from the 'All Statuses' dropdown to apply the Pending status filter.
        # Pending option
        elem = page.get_by_role("option", name="Pending")
        await elem.click(timeout=10000)
        
        # -> Enter 'Team Meeting' into the 'Search by resource, purpose, or user...' field and press Enter to apply the search.
        # Search by resource, purpose, or user... text field
        elem = page.get_by_role("textbox", name="Search by resource, purpose,")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Team Meeting")
        
        # --> Assertions to verify final state
        
        # --> The Bookings page is open.
        # Assert-outcome: passed
        # Assert: The browser is on the bookings page (URL contains /bookings).
        await expect(page).to_have_url(re.compile("/bookings"), timeout=15000), "The browser is on the bookings page (URL contains /bookings)."
        
        # --> The status filter shows 'Pending'.
        # Assert-outcome: passed
        # Assert: The status filter control displays 'Pending'.
        await expect(page.locator("xpath=/html/body/div/div/main/div/div/main/div/div[2]/div[1]/button").nth(0)).to_have_text("Pending", timeout=15000), "The status filter control displays 'Pending'."
        
        # --> An active booking with purpose 'Team Meeting' and status 'Pending' is displayed.
        # Assert-outcome: passed
        # Assert: The booking row's Purpose cell contains 'Team Meeting'.
        await expect(page.locator("xpath=/html/body/div/div/main/div/div/main/div/div[3]/div/div/table/tbody/tr/td[3]").nth(0)).to_have_text("Team Meeting", timeout=15000), "The booking row's Purpose cell contains 'Team Meeting'."
        # Assert-outcome: passed
        # Assert: The booking row's Status cell contains 'Pending'.
        await expect(page.locator("xpath=/html/body/div/div/main/div/div/main/div/div[3]/div/div/table/tbody/tr/td[8]").nth(0)).to_have_text("Pending", timeout=15000), "The booking row's Status cell contains 'Pending'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    