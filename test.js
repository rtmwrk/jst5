const { clickElement, checkElementDisabled } = require("./lib/commands.js");

let page;

describe("GoToCinema.ru tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  }, 15000);

  afterEach(async () => {
    page.close();
  });

  /** Функциональный позитивный тест
   * Заказываем билет на сеанс:
   * - дата: текущий день + 1 (т.е. завтра);
   * - зал: первый;
   * - время: 10:00;
   * - место: 1 ряд, 1 место
   */
  test("Test # 1. Booking ticket for tomorrow on 10:00 seance in hall # 1", async () => {
    // Выбираем день
    await clickElement(page, "nav a + a");
    // Выбираем сеанс на 10:00, 1 зал
    await clickElement(page, "[data-seance-id='178']");
    // Выбираем 1-е место в 1-м ряду в зале
    await clickElement(page, ".buying-scheme__chair_standart");
    // Проверяем, что кнопка "Забронировать" enable
    await checkElementDisabled(page, ".acceptin-button:disabled", 1000);
  });

  /** Функциональный позитивный тест
   * Заказываем билет на сеанс:
   * - дата: текущий день + 2 (т.е. послезавтра);
   * - зал: второй;
   * - время: 15:00;
   * - место: 1 ряд, 1 место
   */
  test("Test # 2. Booking ticket for day after tomorrow on 15:00 seance in hall # 2", async () => {
    // Выбираем день
    await clickElement(page, "nav a + a + a");
    // Выбираем сеанс на 15:00, 2 зал
    await clickElement(page, "[data-seance-id='173']");
    // Выбираем 1-е место в 1-м ряду в зале
    await clickElement(page, ".buying-scheme__chair_standart");
    // Проверяем, что кнопка "Забронировать" enable
    await checkElementDisabled(page, ".acceptin-button:disabled");
  });

  /** Функциональный негативный тест
   * Заказываем билет на сеанс:
   * - дата: текущий день + 2 (т.е. послезавтра);
   * - зал: второй;
   * - время: 17:00;
   * - место: 1 ряд, 1 место
   */
  test("Test # 3. Booking ticket for day after tomorrow on 15:00 seance in hall # 2", async () => {
    // Выбираем день
    await clickElement(page, "nav a + a + a");
    // Выбираем сеанс на 17:00, 2 зал
    await clickElement(page, "[data-seance-id='189']");
    // Выбираем 1-е место в 1-м ряду в зале
    await clickElement(page, ".buying-scheme__chair_standart");
    // Проверяем, что кнопка "Забронировать" enable
    await checkElementDisabled(page, ".acceptin-button:disabled");
  });
});
