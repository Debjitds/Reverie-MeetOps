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
        
        # -> Open the registration page by navigating to http://localhost:5173/register.
        await page.goto("http://localhost:5173/register")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) with valid values and submit the form by clicking the 'Register' button.
        # Enter your full name text field
        elem = page.locator('[id="name"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Debjit Sarkar")
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) with valid values and submit the form by clicking the 'Register' button.
        # Letters, numbers, and underscores only text field
        elem = page.locator('[id="username"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("debjitchsarkarofficial2003")
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) with valid values and submit the form by clicking the 'Register' button.
        # At least 8 characters with letters and numbers password field
        elem = page.locator('[id="password"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) with valid values and submit the form by clicking the 'Register' button.
        # Re-enter password password field
        elem = page.locator('[id="confirm-password"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("DEBjit737362!")
        
        # -> Fill the registration form fields (Full Name, Username, Password, Confirm Password) with valid values and submit the form by clicking the 'Register' button.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button to submit the form and trigger any terms-acceptance validation message.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button to trigger a terms-acceptance validation message and observe the page response.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'I agree to the User Agreement and Privacy Policy' checkbox to accept terms, then click the 'Register' button.
        # button
        elem = page.locator('[id="terms"]')
        await elem.click(timeout=10000)
        
        # -> Click the 'I agree to the User Agreement and Privacy Policy' checkbox to accept terms, then click the 'Register' button.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button to submit the registration form and observe whether the app allows completion now that the terms checkbox is accepted.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Uncheck the 'I agree to the User Agreement and Privacy Policy' checkbox and click the 'REGISTER' button to submit, then observe whether a validation error about accepting terms appears.
        # button
        elem = page.locator('[id="terms"]')
        await elem.click(timeout=10000)
        
        # -> Uncheck the 'I agree to the User Agreement and Privacy Policy' checkbox and click the 'REGISTER' button to submit, then observe whether a validation error about accepting terms appears.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button while leaving the 'I agree to the User Agreement and Privacy Policy' checkbox unchecked and verify whether a visible validation error about accepting the terms appears.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'REGISTER' button while leaving the 'I agree to the User Agreement and Privacy Policy' checkbox unchecked and then observe the page for a visible validation message.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button while leaving the 'I agree to the User Agreement and Privacy Policy' checkbox unchecked and verify whether an error about accepting the terms appears.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'REGISTER' button while leaving the 'I agree to the User Agreement and Privacy Policy' checkbox unchecked, then observe whether a visible validation error about accepting the terms appears.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button while leaving the 'I agree to the User Agreement and Privacy Policy' checkbox unchecked and check for a visible validation error that says the terms must be accepted.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'REGISTER' button while the 'I agree to the User Agreement and Privacy Policy' checkbox is unchecked and observe whether a terms-acceptance validation message appears or registration proceeds.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Register' button to submit the form and check the page for a visible terms-acceptance validation message.
        # Register button
        elem = page.get_by_role('button', name='Register', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> No visible validation message requiring acceptance of the terms was shown when submitting the registration form with the terms checkbox left unchecked.
        # Assert-outcome: failed
        # Assert: Expected the page to show a visible validation message about accepting the terms.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[2]/div[2]/div[2]/form/button").nth(0)).to_contain_text("accept the terms", timeout=15000), "Expected the page to show a visible validation message about accepting the terms."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    