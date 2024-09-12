import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";


const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class LoginPage extends BasePage {

    private email = By.id("form3Example3");
    private password = By.id("form3Example4");
    private loginButton = By.xpath('//*[@id="login-btn"]');
    private signupButton = By.xpath('//*[@id="login-form"]/div[3]/a/b');

    constructor(driver: WebDriver) {
        super(driver);
    }
    async enterEmail() {
        await this.fillInputField(this.email, testData.data.email);
    }
    async enterPassword() {
        await this.fillInputField(this.password, testData.data.password);
    }

    async enterPasswordWrong() {
        await this.fillInputField(this.password, testData.data.passwordWrong);
    }

    async clickLogin() {
        await this.findElementAndClick(this.loginButton);
    }
    async clickSignup() {
        await this.findElementAndClick(this.signupButton);
    }
}