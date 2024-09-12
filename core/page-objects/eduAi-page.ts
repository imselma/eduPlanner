import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class EduAiPage extends BasePage {

    private eduAiInput = By.xpath('//*[@id="text"]');
    private eduAiSend = By.xpath('//*[@id="eduAi"]/bod/section/div/div[2]/div/div[2]/button[1]');


    constructor(driver: WebDriver) {
        super(driver);
    }

    async clickQuestionInput(){
        const inputQuestion = await this.driver.findElement(this.eduAiInput);
        await this.driver.executeScript("arguments[0].click();", inputQuestion);
    }

    async enterQuestion() {
        await this.fillInputField(this.eduAiInput, testData.aiData.question);
    }

    async clickSendQuestion(){
        const sendQuestion = await this.driver.findElement(this.eduAiSend);
        await this.driver.executeScript("arguments[0].click();", sendQuestion);
    }

}