import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ProfilePage extends BasePage {

    private editPencilButton = By.xpath('//*[@id="exam-card-9"]/div[5]/button[1]');
    private dropdownMenuButton = By.xpath('//*[@id="edit-exam-box-on-profile"]/div[1]/div/button');
    private dropdownItemButton = By.xpath('//*[@id="event-type-dropdown-editp"]/a[2]');
    private eventNameInputEdit = By.xpath('//*[@id="editnamep"]');
    private eventLocationInputEdit = By.xpath('//*[@id="editdetailsp"]');
    private timeIconButtonEdit = By.xpath('//*[@id="edittimep"]');
    private dateIconButtonEdit = By.xpath('//*[@id="editdatep"]');
    private submitButtonEdit = By.xpath('//*[@id="modal-confirm-edit-on-profile"]');
  


    constructor(driver: WebDriver) {
        super(driver);
    }

    async clickEditPencilButton(){
        const clickEditEvent = await this.driver.findElement(this.editPencilButton);
        await this.driver.executeScript("arguments[0].click();", clickEditEvent);
    }

    async clickDropdown(){
        const clickDropdownMenu = await this.driver.findElement(this.dropdownMenuButton);
        await this.driver.executeScript("arguments[0].click();", clickDropdownMenu);
    }

    async clickDropdownMenuEdit() {
        const dropdownMenuButtonEdit = await this.driver.findElement(this.dropdownItemButton);
        await this.driver.executeScript("arguments[0].click();", dropdownMenuButtonEdit);
    }

    async clickDropdownMenuItemEdit() {
        const dropdownMenuButtonItem = await this.driver.findElement(this.dropdownItemButton);
        await this.driver.executeScript("arguments[0].click();", dropdownMenuButtonItem);
    }

    async clickEventNameInputEdit(){
        const inputFieldEventNameEdit = await this.driver.findElement(this.eventNameInputEdit);
        await this.driver.executeScript("arguments[0].click();", inputFieldEventNameEdit);
    }

    async clearEventNameEdit() {
        await this.clear(this.eventNameInputEdit);
    }

    async enterEventNameEdit() {
        await this.fillInputField(this.eventNameInputEdit, testData.editExamData.examName);
    }

    async clickEventLocationInputEdit(){
        const inputFieldEventLocationEdit = await this.driver.findElement(this.eventLocationInputEdit);
        await this.driver.executeScript("arguments[0].click();", inputFieldEventLocationEdit);
    }

    async clearEventLocationEdit() {
        await this.clear(this.eventLocationInputEdit);
    }

    async enterEventLocationEdit() {
        await this.fillInputField(this.eventLocationInputEdit, testData.editExamData.examLocation);
    }

    async clickTimeInputEdit(){
        const inputTimeEdit = await this.driver.findElement(this.timeIconButtonEdit);
        await this.driver.executeScript("arguments[0].click();", inputTimeEdit);
    }

    async clearTimeEdit() {
        await this.clear(this.timeIconButtonEdit);
    }

    async enterTimeEdit() {
        await this.fillInputField(this.timeIconButtonEdit, testData.editExamData.examTime);
    }

    async clickDateInputEdit(){
        const inputDateEdit = await this.driver.findElement(this.dateIconButtonEdit);
        await this.driver.executeScript("arguments[0].click();", inputDateEdit);
    }

    async clearDateEdit() {
        await this.clear(this.dateIconButtonEdit);
    }

    async enterDateEdit() {
        await this.fillInputField(this.dateIconButtonEdit, testData.editExamData.examDate);
    }

    async clickSubmitEdit() {
        const submitButtonElementEdit = await this.driver.findElement(this.submitButtonEdit);
        await this.driver.executeScript("arguments[0].click();", submitButtonElementEdit);
    }

}