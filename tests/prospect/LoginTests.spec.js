import {test,expect,chromium} from '@playwright/test'
import {LoginPage} from '../../Pages/Prospect/LoginPage.js'
import{MainPage} from '../../Pages/Prospect/MainPage.js'
import{OverviewPage} from '../../Pages/Prospect/OverviewPage.js'
import{FrameManager} from '../../Pages/Prospect/FrameManager.js'

let browser;
let context;
let page;
let logIn;


test.beforeAll("startup",async()=>{
browser = await chromium.launch({headless:false})
context = await browser.newContext()
page = await context.newPage()

})

test.afterAll("closing",async()=>{
    await context.close()
    await browser.close()
})

test.describe("LoginTests",()=>{
test("invalidUserAndPass_1", async()=>{
logIn = new LoginPage(page)
await logIn.open()
await logIn.EnterUsername("guru")
await logIn.EnterPassword("prasad")
await logIn.Submit()
//validating error message
expect(await logIn.getErrorMessage()).toBe(logIn.message)

})

test("invalidpassword_2",async()=>{
await logIn.EnterUsername("samrat_qa")
await logIn.EnterPassword("prasad@123")
await logIn.Submit()
//validating error message
expect(await logIn.getErrorMessage()).toBe(logIn.message)
})


test("validusernameandPass_3",async()=>{
//logIn = new LoginPage(page)    
//await logIn.open()    
await logIn.EnterUsername("samrat_qa")
await logIn.EnterPassword("rules")
await logIn.Submit()
await page.waitForLoadState('networkidle');
const log = new MainPage(page)
//validating logo presence after login
await expect(log.getLogo()).toBeVisible()
})
})


//Tests on Overview Page
test.describe("overview Tests",()=>{
let mainpage2 ;
let over;
let op;
let cover2;

test("open_prospect_1",async()=>{
let mainpage2 = new MainPage(page)
//enter prospect ID
await mainpage2.EnterProspectID('PR-357846')
//await page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
//let frame1 = await page.frameLocator('//iframe[@title="PR-357846"]')
const frame2 = new FrameManager(page)
over = new OverviewPage(await frame2.getFrame())
await page.waitForLoadState('networkidle');
await expect(over.overvieW()).toBeVisible()
await over.overviewClick()
})


test('validateScreenFlowtree_2',async()=>{
//getting frame     

//await page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
//let frame1 = await page.frameLocator('//iframe[@title="PR-357846"]')
const frame1 = new FrameManager(page)
op= new OverviewPage(await frame1.getFrame())
await op.waitForScreenFlow()
let options = op.getScreenFlow()
let count = await options.count()
//validating count of the screenoptions
expect(count).toBe(7)

//validating screenOptions
for(let i =0;i<count;i++){
    if(i===0){
       expect.soft(await options.nth(i).textContent()).toBe("Overview")
    }else if(i===1){
       expect.soft(await options.nth(i).textContent()).toBe("Member Data Entry")
    }else if(i===2){
       expect.soft(await options.nth(i).textContent()).toBe("Required To Bind")
    }else if(i===3){
       expect.soft(await options.nth(i).textContent()).toBe("Broker Bind Order")
    }else if(i===4){
       expect.soft(await options.nth(i).textContent()).toBe("Bound Coverage Review")
    }else if(i===5){
       expect.soft(await options.nth(i).textContent()).toBe("Invoice Summary")
    }else if(i===6){
       expect.soft(await options.nth(i).textContent()).toBe("Confirm")
    }
    
}
})

test('Validate_WithoutCoverage_ErrorMessage_3',async()=>{
//mainpage.getFrame()
//await page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
//let frame1 = await page.frameLocator('//iframe[@title="PR-357846"]')
const frame3 = new FrameManager(page)
const cover = new OverviewPage(await frame3.getFrame())
await cover.clickSubmitButton()
//mainpage.getFrame()
//await page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
//let frame2 = await page.frameLocator('//iframe[@title="PR-357846"]')
const frame4 = new FrameManager(page)
cover2 = new OverviewPage(await frame4.getFrame())
await cover2.wait_El(cover2.errorWithoutCoverage)
await expect(cover.get_withoutCoverage_Error()).toContainText("Error: Please enter at-least one coverage.")
})

test('validateOverviewComments_4',async()=>{
 await expect(op.getOverview()).toBeVisible()
 expect(await op.getOverviewBox().isEnabled()).toBe(true)
})


test('validateServiceInstructions_5',async()=>{
    await expect(op.getService()).toBeVisible()
    expect(await op.getServiceBox().isEnabled()).toBe(true)
})


test('validateCollectioncomments_6',async()=>{
await expect(op.getCollection()).toBeVisible()
expect(await op.getCollectinBox().isEnabled()).toBe(true)
})


test('validateCoverageList_7',async()=>{
const Loc = await op.getCoverageList()
const count = await Loc.count()
expect.soft(count).toBe(5)

for(let i =0;i<count;i++){
if(i===0){
    expect (await Loc.nth(i).textContent()).toBe('Select...')
}
else if(i===1){
    expect (await Loc.nth(i).textContent()).toBe("Workers' Compensation")
}
else if(i===2){
expect (await Loc.nth(i).textContent()).toBe("Auto Physical Damage")
}
else if(i===3){
expect (await Loc.nth(i).textContent()).toBe("General Liability")
}
else if(i===4){
expect (await Loc.nth(i).textContent()).toBe("Auto Liability")
}

}

//adding WC,GL,AL,APD
await op.fillCoverage()


})

test('validateSaveAndSubButton_8',async()=>{
await expect(cover2.get_saveAndExit_button()).toBeVisible()
await expect(cover2.get_saveAndExit_button()).toBeEnabled()
await expect(cover2.getSubmitButton()).toBeVisible()
await expect(cover2.getSubmitButton()).toBeEnabled()
await cover2.clickSubmitButton()
})



})

//-------------------------- Tests On Member Data Entry Screen ---------------------

test.describe("MDE_TESTS",async()=>{








})

