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
        
        # -> Click the 'Login' link in the top navigation to open the login page.
        # Login link
        elem = page.get_by_role("navigation").get_by_role("link", name="Login")
        await elem.click(timeout=10000)
        
        # -> Fill the 'Enter username' field with the reviewer username, fill the 'Enter password' field with the reviewer password, then click the 'LOGIN' button.
        # Enter username text field
        elem = page.get_by_role("textbox", name="Username")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("debjitchsarkarofficial2003")
        
        # -> Fill the 'Enter username' field with the reviewer username, fill the 'Enter password' field with the reviewer password, then click the 'LOGIN' button.
        # Enter password password field
        elem = page.get_by_role("textbox", name="Password")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the 'Enter username' field with the reviewer username, fill the 'Enter password' field with the reviewer password, then click the 'LOGIN' button.
        # Login button
        elem = page.get_by_role("button", name="Login")
        await elem.click(timeout=10000)
        
        # -> Click the 'View All Bookings' link to open the full bookings list.
        # View All Bookings link
        elem = page.get_by_role("link", name="View All Bookings")
        await elem.click(timeout=10000)
        
        # -> Open the 'All Statuses' dropdown to look for a 'Pending' status option.
        # All Statuses button
        elem = page.get_by_role("combobox").filter(has_text="All Statuses")
        await elem.click(timeout=10000)
        
        # -> Select the 'Pending' option from the 'All Statuses' dropdown to filter the bookings list to pending bookings.
        # Pending option
        elem = page.get_by_role("option", name="Pending")
        await elem.click(timeout=10000)
        
        # -> Open the first pending booking row labeled 'Room 15 — Project kickoff meeting' to view its details.
        # Room 15 1st Floor Deb Project kickoff meeting Oct...
        elem = page.get_by_role("row", name="Room 15 1st Floor Deb Project kickoff meeting Oct 7, 2026 - Oct 7, 2026 9:00 AM")
        await elem.click(timeout=10000)
        
        # -> Click the 'Room 15 — Project kickoff meeting' row to open its booking detail.
        # Room 15 1st Floor Deb Project kickoff meeting Oct...
        elem = page.get_by_role("row", name="Room 15 1st Floor Deb Project kickoff meeting Oct 7, 2026 - Oct 7, 2026 9:00 AM")
        await elem.click(timeout=10000)
        
        # -> Click the 'Room 15' cell for the first pending booking (Project kickoff meeting) to open its booking details.
        # Room 15 1st Floor
        elem = page.get_by_role("cell", name="Room 15 1st Floor").first
        await elem.click(timeout=10000)
        
        # -> Click the 'Project kickoff meeting' cell for the first pending booking to open its booking detail.
        # Project kickoff meeting
        elem = page.get_by_role("cell", name="Project kickoff meeting").first
        await elem.click(timeout=10000)
        
        # -> Click the 'Pending' status cell in the first booking row to try to open the booking detail or context menu.
        # Pending
        elem = page.get_by_role("cell", name="Pending").first
        await elem.click(timeout=10000)
        
        # -> Click the action link at the end (rightmost cell) of the first pending booking row to open its booking details.
        # View link
        elem = page.get_by_role("row", name="Room 15 1st Floor Deb Project kickoff meeting Oct 7, 2026 - Oct 7, 2026 9:00 AM").get_by_role("link")
        await elem.click(timeout=10000)
        
        # -> Click the 'Approve' button to approve the booking.
        # Approve button
        elem = page.get_by_role("button", name="Approve")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The booking details show the status as 'Approved'.
        # Assert-outcome: passed
        # Assert: The booking details page contains the text 'Approved' indicating the booking status.
        await expect(page.locator("#root").nth(0)).to_contain_text("approved", timeout=15000), "The booking details page contains the text 'Approved' indicating the booking status."
        
        # --> A success confirmation toast 'Booking approved successfully' is visible.
        # Assert-outcome: passed
        # Assert: A visible success toast reads 'Booking approved successfully'.
        await expect(page.locator("xpath=/html/body/div[1]/section/ol/li").nth(0)).to_have_text("Booking approved successfully", timeout=15000), "A visible success toast reads 'Booking approved successfully'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    