import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


export class HomePage extends BasePage {
    
    private menu_button = By.className("menu-toggle rounded");
    private startnow_button = By.xpath('//*[@id="sidebar-wrapper"]/ul/li[6]/a');
    
    constructor(driver: WebDriver) {
        super(driver);
    }

    async openMenu() {
        await this.findElementAndClick(this.menu_button);
    }

    async openLoginPage() {
        const startNowElement = await this.driver.findElement(this.startnow_button);
        await this.driver.executeScript("arguments[0].click();", startNowElement);
    }
}