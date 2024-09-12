import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";


const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class RegistrationPage extends BasePage {

    private inputFirstNameField = By.xpath('//*[@id="form3Example1"]');
    private inputLastNameField = By.xpath('//*[@id="form3Example2"]');
    private inputUsernameField = By.id("form3Example10");
    private inputemailFiled = By.id("form3Example4");
    private inputpasswordField = By.xpath('//*[@id="form3Example5"]');
    private inputNumberField = By.xpath('//*[@id="form3Example6"]');
    private submitButton = By.xpath('//*[@id="signup-form"]/button');


    constructor(driver: WebDriver) {
        super(driver);
    }

    async clickFirstNameField(){
        const inputFieldFirstName = await this.driver.findElement(this.inputFirstNameField);
        await this.driver.executeScript("arguments[0].click();", inputFieldFirstName);
    }

    async enterFirstName() {
        await this.fillInputField(this.inputFirstNameField, testData.registrationData.firstName);
    }

    async clickLastNameField(){
        const inputFieldLastName = await this.driver.findElement(this.inputLastNameField);
        await this.driver.executeScript("arguments[0].click();", inputFieldLastName);
    }

    async enterLastName() {
        await this.fillInputField(this.inputLastNameField, testData.registrationData.lastName);
    }

    async clickUsernameField(){
        const inputUsername = await this.driver.findElement(this.inputUsernameField);
        await this.driver.executeScript("arguments[0].click();", inputUsername);
        
    }

    async enterUsername() {
        await this.fillInputField(this.inputUsernameField, testData.registrationData.username);
    }

    async enterUsernameWrong() {
        await this.fillInputField(this.inputUsernameField, testData.registrationData.usernameFail);
    }

    async clickEmailField(){
        const inputEmail = await this.driver.findElement(this.inputemailFiled);
        await this.driver.executeScript("arguments[0].click();", inputEmail);
    }

    async enterEmail() {
        await this.fillInputField(this.inputemailFiled, testData.registrationData.email);
    }

    async clickPasswordField() {
        const inputPassword = await this.driver.findElement(this.inputpasswordField);
        await this.driver.executeScript("arguments[0].click();", inputPassword);
    }

    async enterPassword() {
        await this.fillInputField(this.inputpasswordField, testData.registrationData.password);
    }

    async enterPasswordWrong() {
        await this.fillInputField(this.inputpasswordField, testData.registrationData.passwordFail);
    }

    async clickNumberField() {
        const inputNumber = await this.driver.findElement(this.inputNumberField);
        await this.driver.executeScript("arguments[0].click();", inputNumber);
    }

    async enterNumber() {
        await this.fillInputField(this.inputNumberField, testData.registrationData.phoneNumber);
    }

    async clickRegisterButton() {
        const inputSubmit = await this.driver.findElement(this.submitButton);
        await this.driver.executeScript("arguments[0].click();", inputSubmit);
    }
}