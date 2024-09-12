import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver} from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { RegistrationPage } from "../core/page-objects/registration-page";
import { LoginPage } from "../core/page-objects/login-page";


const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;
let registrationPage: RegistrationPage;



beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
    registrationPage = new RegistrationPage(driver);
},10000);


test("user registration wrong", async () => {
    await homePage.openMenu();
    await homePage.openLoginPage();
    await loginPage.clickSignup();
    await registrationPage.clickFirstNameField();
    await registrationPage.enterFirstName();
    await registrationPage.clickLastNameField();
    await registrationPage.enterLastName();
    await registrationPage.clickUsernameField();
    await registrationPage.enterUsernameWrong();
    await registrationPage.clickEmailField();
    /*await registrationPage.enterEmail();
    await registrationPage.clickPasswordField();
    await registrationPage.enterPasswordWrong();
    await registrationPage.clickNumberField();
    await registrationPage.enterNumber();
    await registrationPage.clickRegisterButton();*/

},200000);


/*afterAll(async () => {
    await quitDriver(driver);
},10000);*/