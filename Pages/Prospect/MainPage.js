export class MainPage{

constructor(page){
    this.page = page
    this.logo = '//a[text() ="Samrat_QA"]'
    this.search = '//input[@title="Enter text to search"]'
    
    this.iframeLocator = '//iframe[@title="PR-357846"]'
}

//locating iframe after refreshing the page
async getFrame(){
    await page.waitForSelector(this.iframeLocator, { state: 'visible' });
    let frame1 = await page.frameLocator(this.iframeLocator)
    console.log('Frame locator:', frame1);
    return frame1;
}


getLogo(){
    return this.page.locator(this.logo)
}

async EnterProspectID(prospectID){
    await this.page.locator(this.search).fill(prospectID)
    await this.page.keyboard.press('Enter')

}






}