import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class CalendarPage extends BasePage {
    
    private dateButton = By.xpath('//*[@id="calendar"]/div/div[2]/div/div/div[1]/div/div[2]/table/tbody/tr[3]/td[4]');
    private addEventButton = By.xpath('//*[@id="add-button"]');
    private dropdownMenu = By.xpath('//*[@id="form"]/div[1]/div/button');
    private dropdownItem = By.xpath('//*[@id="event-type-dropdown"]/a[2]');
    private eventNameInput = By.xpath('//*[@id="e-name"]');
    private eventLocationInput = By.xpath('//*[@id="e-details"]');
    private timeIconButton = By.xpath('//*[@id="e-time"]');
    private submitButton = By.xpath('//*[@id="ok-button"]');
    private deleteButtonIcon = By.xpath('//*[@id="calendar"]/div/div[2]/div/div/div[2]/div[2]/div[5]/button[2]');
    private deleteButtonModal = By.xpath('//*[@id="alert-confirm-delete"]');
    private hamburgermenuButton = By.xpath('/html/body/a[1]');
    private profileMenuItem = By.xpath('/html/body/nav/ul/li[3]/a');

    private eduAiItem = By.xpath('//*[@id="sidebar-wrapper"]/ul/li[4]/a');
    private eduAiInput = By.xpath('//*[@id="text"]');
    private eduAiSend = By.xpath('//*[@id="eduAi"]/bod/section/div/div[2]/div/div[2]/button[1]');


    constructor(driver: WebDriver) {
        super(driver);
    }

    async clickDate() {
        const dateButtonElement = await this.driver.findElement(this.dateButton);
        await this.driver.executeScript("arguments[0].click();", dateButtonElement);
    }

    async clickAddEvent() {
        const addEventButtonElement = await this.driver.findElement(this.addEventButton);
        await this.driver.executeScript("arguments[0].click();", addEventButtonElement);
    }

    async clickDropdownMenu() {
        const dropdownMenuButton = await this.driver.findElement(this.dropdownMenu);
        await this.driver.executeScript("arguments[0].click();", dropdownMenuButton);
    }

    async clickDropdownMenuItem() {
        const dropdownMenuButtonItem = await this.driver.findElement(this.dropdownItem);
        await this.driver.executeScript("arguments[0].click();", dropdownMenuButtonItem);
    }

    async clickEventNameInput(){
        const inputFieldEventName = await this.driver.findElement(this.eventNameInput);
        await this.driver.executeScript("arguments[0].click();", inputFieldEventName);
    }

    async enterEventName() {
        await this.fillInputField(this.eventNameInput, testData.examData.examName);
    }

    async clickEventLocationInput(){
        const inputFieldEventLocation = await this.driver.findElement(this.eventLocationInput);
        await this.driver.executeScript("arguments[0].click();", inputFieldEventLocation);
    }

    async enterEventLocation() {
        await this.fillInputField(this.eventLocationInput, testData.examData.examLocation);
    }

    async clickTimeInput(){
        const inputTime = await this.driver.findElement(this.timeIconButton);
        await this.driver.executeScript("arguments[0].click();", inputTime);
    }

    async enterTime() {
        await this.fillInputField(this.timeIconButton, testData.examData.examTime);
    }

    async clickSubmit() {
        const submitButtonElement = await this.driver.findElement(this.submitButton);
        await this.driver.executeScript("arguments[0].click();", submitButtonElement);
    }

    async clickDeleteIconButton() {
        const deleteIconButton = await this.driver.findElement(this.deleteButtonIcon);
        await this.driver.executeScript("arguments[0].click();", deleteIconButton);
    }

    async clickDeleteSubmit() {
        const deleteButtonSubmit = await this.driver.findElement(this.deleteButtonModal);
        await this.driver.executeScript("arguments[0].click();", deleteButtonSubmit);
    }

    async clickHamburgerButton(){
        const clicHamburgerButton = await this.driver.findElement(this.hamburgermenuButton);
        await this.driver.executeScript("arguments[0].click();", clicHamburgerButton);
    }

    async clickProfileMenuItem(){
        const clickProfileMenu = await this.driver.findElement(this.profileMenuItem);
        await this.driver.executeScript("arguments[0].click();", clickProfileMenu);
    }
    
    async clickEduAiButton() {
        const chatBotButton = await this.driver.findElement(this.eduAiItem);
        await this.driver.executeScript("arguments[0].click();", chatBotButton);
    }

}