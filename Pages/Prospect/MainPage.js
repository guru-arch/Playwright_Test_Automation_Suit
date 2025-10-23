export class MainPage{

constructor(page){
    this.page = page
    
    this.logo = '//a[text() ="Samrat_QA"]'
    this.search = '//input[@title="Enter text to search"]'
}

getLogo(){
    return this.page.locator(this.logo)
}

async EnterProspectID(prospectID){
    await this.page.locator(this.search).fill(prospectID)
    await this.page.keyboard.press('Enter')

}





}