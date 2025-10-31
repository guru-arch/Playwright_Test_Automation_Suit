import {test,expect,chromium} from '@playwright/test'
import {LoginPage} from '../../Pages/Prospect/LoginPage.js'
import{MainPage} from '../../Pages/Prospect/MainPage.js'
import{OverviewPage} from '../../Pages/Prospect/OverviewPage.js'
import{FrameManager} from '../../Pages/Prospect/FrameManager.js'
import{MdePage} from '../../Pages/Prospect/MdePage.js'

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
let mde;
let mdeScreen1;

test('Validate_Sections_1',async()=>{
let mde1 = new FrameManager(page)
let mdeScreen = new MdePage(await mde1.getFrame())
//Validating Ops Cost Entry Screen
expect(mdeScreen.getOpsCostEntrySection()).toBeVisible
expect(mdeScreen.getOpsCostEntrySection()).toBeEnabled
//Validating LOC Details Section
expect(mdeScreen.getLocDetailsSection()).toBeVisible
expect(mdeScreen.getLocDetailsSection()).toBeEnabled
//Validating Below The Line Section
expect(mdeScreen.getBelowTheLineSection()).toBeVisible
expect(mdeScreen.getBelowTheLineSection()).toBeEnabled
//Validating Member Total Section
expect(mdeScreen.getMemberTotalsSection()).toBeVisible
expect(mdeScreen.getMemberTotalsSection()).toBeEnabled
//Validating Member Miscellaneous Section
expect(mdeScreen.getMemberMiscellaneousSection()).toBeVisible
expect(mdeScreen.getMemberMiscellaneousSection()).toBeEnabled
})

test('Validate_OpsCost_Heading_2',async()=>{
mde = new FrameManager(page)
mdeScreen1 = new MdePage(await mde.getFrame())
//clicking on ops cost section
await mdeScreen1.clickOnOpsCost()
//let mde2 = new FrameManager(page)
//let mdeScreen1 = new MdePage(await mde2.getFrame())
await mdeScreen1.waitForElement(mdeScreen1.OpsCostTableHeading)
let headings = mdeScreen1.getOpsCostTableHeading()
let headCount = await headings.count()
//validating count of the Ops headings
expect(headCount).toBe(4)
//validating each headings
for(let i=0;i<headCount;i++){
   if(i===0){
    expect(await headings.nth(i).textContent()).toBe('Coverage Name')
   }
   if(i===1){
    expect(await headings.nth(i).textContent()).toBe('Cost Name')
   }
   if(i===2){
    expect(await headings.nth(i).textContent()).toBe('Default Percentage')
   }
   if(i===3){
    expect(await headings.nth(i).textContent()).toBe('Updated Percentage')
   }
}
})

test('Validate_coverages_MDE_3',async()=>{
await expect(mdeScreen1.get_wcCoverage()).toBeVisible()
//validating APD Coverage
await expect(mdeScreen1.get_apdCoverage()).toBeVisible()
await expect(mdeScreen1.get_apdCoverage()).toBeEnabled()
//validating GL Coverage
await expect(mdeScreen1.get_glCoverage()).toBeVisible()
await expect(mdeScreen1.get_glCoverage()).toBeEnabled()
//validating AL Coverage
await expect(mdeScreen1.get_alCoverage()).toBeVisible()
await expect(mdeScreen1.get_alCoverage()).toBeEnabled()
})

test('Validate_WC_Coverage_Error_4',async()=>{
await mdeScreen1.clickSub()
let mde4 = new FrameManager(page)
let mdeScreen4 = new MdePage(await mde.getFrame())
//waiting for the error element
await page.waitForTimeout(5000)
//validating acturial exposure error
let exposureError = mdeScreen4.get_actExpoError()
expect(await exposureError.count()).toBe(4)
//validating acturial exposure Base error
let exposureBaseError = mdeScreen4.get_actBaseError()
expect(await exposureBaseError.count()).toBe(4)
//validating acturial exposure Description error
let exposureDesError = mdeScreen4.get_actDesError()
expect(await exposureDesError.count()).toBe(4)
//validating A fund error
let AfundAdjError = mdeScreen4.get_aFactError()
expect(await AfundAdjError.count()).toBe(4)
//validating audit exposure error
let audExpoError = mdeScreen4.get_audExpoError()
expect(await audExpoError.count()).toBe(4)
//validating audit exposure base error
let audExpoBasError = mdeScreen4.get_audBaseError()
expect(await audExpoBasError.count()).toBe(4)
//validating audit exposure description error
let audDescError = mdeScreen4.get_audDesError()
expect(await audDescError.count()).toBe(4)
})




})

