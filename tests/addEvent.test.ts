import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver} from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import { CalendarPage } from "../core/page-objects/calendar-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;
let calendarPage: CalendarPage;


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
    calendarPage = new CalendarPage(driver);
},10000);


test("add event", async () => {
    await homePage.openMenu();
    await homePage.openLoginPage();
    await loginPage.enterEmail();
    await loginPage.enterPassword();
    await loginPage.clickLogin();
    await calendarPage.clickDate();
    await calendarPage.clickAddEvent();
    await calendarPage.clickDropdownMenu();
    await calendarPage.clickDropdownMenuItem();
    await calendarPage.clickEventNameInput();
    await calendarPage.enterEventName();
    await calendarPage.clickEventLocationInput();
    await calendarPage.enterEventLocation();
    await calendarPage.clickTimeInput();
    await calendarPage.enterTime();
    await calendarPage.clickSubmit();

},30000);

/*afterAll(async () => {
    await quitDriver(driver);
},10000);*/