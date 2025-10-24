import {test,expect,chromium} from '@playwright/test'
import {LoginPage} from '../../Pages/Prospect/LoginPage.js'
import{MainPage} from '../../Pages/Prospect/MainPage.js'
import{OverviewPage} from '../../Pages/Prospect/OverviewPage.js'

let browser;
let context;
let page;
let logIn;
let frame;

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


test("validusernameandPass_4",async()=>{
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
let mainpage ;
let over;
let op;

test("open_prospect",async()=>{
mainpage = new MainPage(page)
//enter prospect ID
await mainpage.EnterProspectID('PR-357846')
await page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
frame = await page.frameLocator('//iframe[@title="PR-357846"]')
over = new OverviewPage(frame)
await page.waitForLoadState('networkidle');
await expect(over.overvieW()).toBeVisible()
await over.overviewClick()
})


test('validateScreenFlowtree',async()=>{
//getting frame     
await page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
const frame1 = await page.frameLocator('//iframe[@title="PR-357846"]')
op= new OverviewPage(frame1)
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

test('Validate_WithoutCoverage_ErrorMessage',async()=>{
await page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
const frame1 = await page.frameLocator('//iframe[@title="PR-357846"]')
const cover = new OverviewPage(frame1)
await cover.clickSubmitButton()
await page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
const frame2 = await page.frameLocator('//iframe[@title="PR-357846"]')
const cover2 = new OverviewPage(frame2)
await cover2.wait_El(cover2.errorWithoutCoverage)
await expect(cover.get_withoutCoverage_Error()).toContainText("Error: Please enter at-least one coverage.")
})

test('validateOverviewComments',async()=>{
 await expect(op.getOverview()).toBeVisible()
 expect(await op.getOverviewBox().isEnabled()).toBe(true)
})


test('validateServiceInstructions',async()=>{
    await expect(op.getService()).toBeVisible()
    expect(await op.getServiceBox().isEnabled()).toBe(true)
})


test('validateCollectioncomments',async()=>{
await expect(op.getCollection()).toBeVisible()
expect(await op.getCollectinBox().isEnabled()).toBe(true)
})


test('validateCoverageList',async()=>{
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
//select wc coverage
await op.fillCoverage()


})





})

