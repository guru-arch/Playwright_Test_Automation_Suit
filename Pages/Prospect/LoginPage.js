
export class LoginPage{


   constructor(page){
    this.page = page
    this.userName = '//input[@id="txtUserID"]'
    this.passWord = '//input[@id="txtPassword"]'
    this.button = '//button[@id="sub"]'
    this.error = '//div[@class="errorMessage"]'
    this.message = 'The information you entered was not recognized. '
   }
 
//opening URL
async open(){
  await this.page.goto("https://captv-stg1.pegacloud.io/prweb/app/PIC/xbHu3hfavxTLkEni2dIEKW87dKzQq6k8*/!STANDARD?pyActivity=%40baseclass.pzProcessURLInWindow&pyPreActivity=Embed-PortalLayout.RedirectAndRun&ThreadName=OpenPortal_pyCaseManager7&Location=pyActivity%3DData-Portal.ShowSelectedPortal%26portal%3DpyCaseManager7%26Name%3D%20pyCaseManager7%26pzSkinName%3D%26developer%3Dfalse%26ThreadName%3DOpenPortal_pyCaseManager7%26launchPortal%3Dtrue&bPurgeTargetThread=true&target=popup&portalThreadName=STANDARD&portalName=Developer&pzHarnessID=HIDEDA98AC315A4DB9526DA47409871D9C6")
}


//Entering username
  async EnterUsername(name){
    await this.page.locator(this.userName).fill(name)
  }

//Entering password
  async EnterPassword(pass){
    await this.page.locator(this.passWord).fill(pass)
  }
  
//Click On Submit
 async Submit(){
    await this.page.locator(this.button).click()
 }

//error message

async getErrorMessage(){
    let message = await this.page.locator(this.error).textContent()
    return message
}


}

