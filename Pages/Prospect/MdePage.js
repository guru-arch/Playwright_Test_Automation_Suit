export class MdePage{

 constructor(frame){
    this.frame = frame
    this.OpsCostEntrySection ='//div[text()="Summary Ops Cost Entry"]'
    this.LocDetailsSection= '//div[text()="LOC Details"]'
    this.BelowTheLineSection = '//div[text()="Below the line"]'
    this.MemberTotalsSection = '//div[text()="Member Totals"]'
    this.MemberMiscellaneousSection ='Member Miscellaneous  Costs'
    this.OpsCostTableHeading = '//div[@columnlist=".CoverageName .ComponentName .ProgramCostDefaultPercent .ProgramCostPercent  "]/table/tbody/tr/td[2]//th//div[@class="cellIn "]'
    this.wcCoverage = '(//h3[text()="Workers\' Compensation"])[2]'
    this.apdCoverage ='//h3[text()="Auto Physical Damage"]'
    this.glCoverage ='//h3[text()="General Liability"]'
    this.alCoverage ='//h3[text()="Auto Liability"]'
    this.subButton = '(//button[text()="Submit"])[2]'
    this.actExpoError ='//span[text()="Actuarial Exposure cannot be blank."]'
    this.actBaseError = '//span[text()="Actuarial Exposure Base cannot be blank."]'
    this.actDesError = '//span[text()="Actuarial Exposure Description cannot be blank."]'
    this.aFactError ='//span[text()="A Fund Loss Cost cannot be blank."]'
    this.audExpoError ='//span[text()="Audit Exposure cannot be blank."]'
    this.audBaseError ='//span[text()="Audit Exposure Base cannot be blank."]'
    this.audDesError ='//span[text()="Audit Exposure Description cannot be blank."]'
 }
 get_audDesError(){
   return this.frame.locator(this.audDesError)
 }
 get_audBaseError(){
   return this.frame.locator(this.audBaseError)
 }
 get_audExpoError(){
   return this.frame.locator(this.audExpoError)
 }
 get_aFactError(){
   return this.frame.locator(this.aFactError)
 }
 get_actDesError(){
   return this.frame.locator(this.actDesError)
 }
 get_actBaseError(){
   return this.frame.locator(this.actBaseError)
 }
 get_actExpoError(){
   return this.frame.locator(this.actExpoError)
 }
 async clickSub(){
   await this.frame.locator(this.subButton).click()
 }
 get_wcCoverage(){
   return this.frame.locator(this.wcCoverage)
 }
 get_apdCoverage(){
   return this.frame.locator(this.apdCoverage)
 }
 get_glCoverage(){
   return this.frame.locator(this.glCoverage)
 }
 get_alCoverage(){
   return this.frame.locator(this.alCoverage)
 }
 
 getOpsCostEntrySection(){
    return this.frame.locator(this.OpsCostEntrySection)
 }

 getLocDetailsSection(){
    return this.frame.locator(this.LocDetailsSection)
 }

 getBelowTheLineSection(){
    return this.frame.locator(this.BelowTheLineSection)
 }

 getMemberTotalsSection(){
    return this.frame.locator(this.MemberTotalsSection)
 }

 getMemberMiscellaneousSection(){
    return this.frame.locator(this.MemberMiscellaneousSection)
 }

 getOpsCostTableHeading(){
    return this.frame.locator(this.OpsCostTableHeading)
 }

 async clickOnOpsCost(){
    this.frame.locator(this.OpsCostEntrySection).click()
 }

 async waitForElement(el){
    await this.frame.locator(el).first().waitFor({state:'visible'})
 }


}