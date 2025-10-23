export class OverviewPage{

constructor(frame){
    this.frame = frame
    this.overview ='//a[text()="Overview (Generate Pricing)"]'
    this.screenFlow ='//div[@id="ScreenFlowTree"]//li/a/span'
    this.overviewComments = '//label[text()="Overview Comments"]'
    this.serviceInstructions ='//label[text()="Service Instructions"]'
    this.collectionComments ='//label[text()="Collections Comments"]'
    this.overInputBox = '//textarea[@name="$PpyWorkPage$pQuote$pCommentGroup$gOverview"]'
    this.serviceInputBox = '//textarea[@name="$PpyWorkPage$pQuote$pCommentGroup$gServiceInstructions"]'
    this.collectionInputBox = '//textarea[@name="$PpyWorkPage$pQuote$pCommentGroup$gCollectionsComments"]'
    this.addCoverage = '//a[@title="Add a row "]'
    this.SelCoverage1 ='//Select[@name="$PpyWorkPage$pQuote$pOrganization$pSubMemberList$l1$pCoveragesList$l1$pLineOfCoverage"]'
    this.SelCovergae2 ='//Select[@name="$PpyWorkPage$pQuote$pOrganization$pSubMemberList$l1$pCoveragesList$l2$pLineOfCoverage"]'
    this.SelCoverage3 ='//Select[@name="$PpyWorkPage$pQuote$pOrganization$pSubMemberList$l1$pCoveragesList$l3$pLineOfCoverage"]'
    this.SelCoverage4 ='//Select[@name="$PpyWorkPage$pQuote$pOrganization$pSubMemberList$l1$pCoveragesList$l4$pLineOfCoverage"]'
    this.coverageList ='//Select[@name="$PpyWorkPage$pQuote$pOrganization$pSubMemberList$l1$pCoveragesList$l1$pLineOfCoverage"]/option'
    this.wcCoverage = '//Select[@name="$PpyWorkPage$pQuote$pOrganization$pSubMemberList$l1$pCoveragesList$l1$pLineOfCoverage"]/option'




}

//function to get overview locator
overvieW(){
    return this.frame.locator(this.overview)
}

//function to click on overview
async overviewClick(){
    await this.frame.locator(this.overview).click()
}

//function to get Screen options
getScreenFlow(){
    return this.frame.locator(this.screenFlow)
}

//function to waitfor screen options
async waitForScreenFlow(){
await this.frame.locator(this.screenFlow).first().waitFor({state:'visible'})
}

//function to get overviewcomments
getOverview(){
    return this.frame.locator(this.overviewComments)
}

//function to get overview commet Box
getOverviewBox(){
    return this.frame.locator(this.overInputBox)
}

//function to get service comments
getService(){
    return this.frame.locator(this.serviceInstructions)
}

//function to get service comments box
getServiceBox(){
    return this.frame.locator(this.serviceInputBox)
}

//function to get collection comments
getCollection(){
    return this.frame.locator(this.collectionComments)
}

//function to get collection comment box
getCollectinBox(){
    return this.frame.locator(this.collectionInputBox)
}

//function to get Coverage list
async getCoverageList(){
   await this.frame.locator(this.addCoverage).click()
   await this.frame.locator(this.SelCoverage1).click()
   //await this.frame.locator(this.coverageList).first().waitFor()
   return this.frame.locator(this.coverageList)
}

async fillCoverage(){
    await this.frame.locator(this.SelCoverage1).selectOption({label:"Workers' Compensation"})
    await this.frame.locator(this.addCoverage).click()
    await this.frame.locator(this.SelCovergae2).selectOption({label:"Auto Physical Damage"})
    await this.frame.locator(this.addCoverage).click()
    await this.frame.locator(this.SelCoverage3).selectOption({label:"General Liability"})
    await this.frame.locator(this.addCoverage).click()
    await this.frame.locator(this.SelCoverage4).selectOption({label:"Auto Liability"})
}
}