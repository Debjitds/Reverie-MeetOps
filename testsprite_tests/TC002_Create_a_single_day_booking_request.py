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
        
        # -> Click the 'LOGIN' button in the top-right of the homepage to open the login page.
        # Login link
        elem = page.get_by_text('Book Rooms.', exact=True).locator("xpath=ancestor-or-self::*[.//a][1]").get_by_role('link', name='Login', exact=True)
        await elem.click(timeout=10000)
        
        # -> Fill the Username field with 'debjitchsarkarofficial2003', fill the Password field with 'DEBjit737362!', then click the 'Login' button.
        # Enter username text field
        elem = page.locator('[id="login-username"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("debjitchsarkarofficial2003")
        
        # -> Fill the Username field with 'debjitchsarkarofficial2003', fill the Password field with 'DEBjit737362!', then click the 'Login' button.
        # Enter password password field
        elem = page.locator('[id="login-password"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the Username field with 'debjitchsarkarofficial2003', fill the Password field with 'DEBjit737362!', then click the 'Login' button.
        # Login button
        elem = page.get_by_text('Username', exact=True).locator("xpath=ancestor-or-self::*[.//button][1]").get_by_role('button', name='Login', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'New Booking' quick action to open the new booking form.
        # New Booking link
        elem = page.get_by_role('link', name='New Booking', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Room 15' resource card, then click the 'Next' button to proceed to the booking details step.
        # Room 15 1st Floor Capacity : 10 Meeting
        elem = page.get_by_text('Room 15 1st Floor Capacity: 10 Meeting', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Room 15' resource card, then click the 'Next' button to proceed to the booking details step.
        # Next button
        elem = page.get_by_role('button', name='Next', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Next' button to proceed to the booking details (purpose and attendees) step.
        # Next button
        elem = page.get_by_role('button', name='Next', exact=True)
        await elem.click(timeout=10000)
        
        # -> Fill the 'Purpose' field with 'Team Meeting', enter 'Alice, Bob' into the 'Attendees' field, then click the 'Create Booking' button.
        # e.g., Team Meeting, Client Presentation text field
        elem = page.locator('[id="purpose"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Team Meeting")
        
        # -> Fill the 'Purpose' field with 'Team Meeting', enter 'Alice, Bob' into the 'Attendees' field, then click the 'Create Booking' button.
        # Enter attendee names separated by commas text area
        elem = page.locator('[id="attendees"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Alice, Bob")
        
        # -> Fill the 'Purpose' field with 'Team Meeting', enter 'Alice, Bob' into the 'Attendees' field, then click the 'Create Booking' button.
        # Create Booking button
        elem = page.get_by_role('button', name='Create Booking', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> A success notification reading 'Booking created successfully!' is visible.
        # Assert-outcome: passed
        # Assert: The page displays the success notification 'Booking created successfully!'.
        await expect(page.locator("xpath=/html/body/div[1]/section/ol/li").nth(0)).to_have_text("Booking created successfully!", timeout=15000), "The page displays the success notification 'Booking created successfully!'."
        
        # --> The new booking appears in Active Bookings for Room 15 with purpose 'Team Meeting' on Sep 2, 2026.
        # Assert-outcome: passed
        # Assert: The booking row's Purpose column contains 'Team Meeting'.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div/main/div/div[3]/div/div/table/tbody/tr[1]/td[3]").nth(0)).to_have_text("Team Meeting", timeout=15000), "The booking row's Purpose column contains 'Team Meeting'."
        # Assert-outcome: passed
        # Assert: The booking row's Date column contains 'Sep 2, 2026'.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div/main/div/div[3]/div/div/table/tbody/tr[1]/td[4]").nth(0)).to_have_text("Sep 2, 2026", timeout=15000), "The booking row's Date column contains 'Sep 2, 2026'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    