import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver} from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import { CalendarPage } from "../core/page-objects/calendar-page";
import { ProfilePage } from "../core/page-objects/profile-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;
let calendarPage: CalendarPage;
let profilePage: ProfilePage;


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
    calendarPage = new CalendarPage(driver);
    profilePage = new ProfilePage(driver);
},10000);


test("edit event", async () => {
    await homePage.openMenu();
    await homePage.openLoginPage();
    await loginPage.enterEmail();
    await loginPage.enterPassword();
    await loginPage.clickLogin();
    await calendarPage.clickHamburgerButton();
    await calendarPage.clickProfileMenuItem();
    await profilePage.clickEditPencilButton();
    await profilePage.clickDropdown();
    await profilePage.clickEventNameInputEdit();
    await profilePage.clearEventNameEdit();
    await profilePage.enterEventNameEdit();
    await profilePage.clickEventLocationInputEdit();
    await profilePage.clearEventLocationEdit();
    await profilePage.enterEventLocationEdit();
    await profilePage.clickTimeInputEdit();
    await profilePage.clearTimeEdit();
    await profilePage.enterTimeEdit();
    await profilePage.clickDateInputEdit();
    await profilePage.clearDateEdit();
    await profilePage.enterDateEdit();
    await profilePage.clickSubmitEdit();

},30000);

/*afterAll(async () => {
    await quitDriver(driver);
},10000);*/