import puppeteer, { Browser } from 'puppeteer'

class HeadlessParser {
  public browserInstance: Browser
  public url: string = 'https://hoff.ru/catalog/gostinaya/divany/?sort=price_asc'

  constructor() {
    this.createBrowser()
  }

  async createBrowser(): Promise<void> {
    try {
      console.log('Opening the browser......')
      let browser: Browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
      })

      this.browserInstance = browser
    } catch (err) {
      console.log('Could not create a browser instance => : ', err)
    }
  }

  async openHoffPage(): Promise<void> {
    let page = await this.browserInstance.newPage()
    console.log(`Navigating to ${this.url}...`)
    await page.goto(this.url)
  }

  async test(): Promise<void> {
    this.openHoffPage()
  }
}

export const headlessParser = new HeadlessParser()
