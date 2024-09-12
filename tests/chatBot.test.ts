import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver} from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import { CalendarPage } from "../core/page-objects/calendar-page";
import { EduAiPage } from "../core/page-objects/eduAi-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;
let calendarPage: CalendarPage;
let eduAiPage: EduAiPage;


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
    calendarPage = new CalendarPage(driver);
    eduAiPage = new EduAiPage(driver);
},10000);


test("sending questions to chatbot", async () => {
    await homePage.openMenu();
    await homePage.openLoginPage();
    await loginPage.enterEmail();
    await loginPage.enterPassword();
    await loginPage.clickLogin();
    await calendarPage.clickHamburgerButton();
    await calendarPage.clickEduAiButton();
    await eduAiPage.clickQuestionInput();
    await eduAiPage.enterQuestion();
    await eduAiPage.clickSendQuestion();
},30000);

/*afterAll(async () => {
    await quitDriver(driver);
},10000);*/