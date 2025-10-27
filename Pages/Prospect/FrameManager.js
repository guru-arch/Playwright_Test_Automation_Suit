export class FrameManager{

constructor(page){
    this.page = page  
}

async getFrame(){
await this.page.waitForSelector('//iframe[@title="PR-357846"]', { state: 'visible' });
let frame1 = await this.page.frameLocator('//iframe[@title="PR-357846"]')
return frame1
}


}