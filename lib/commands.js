module.exports = {
  /**
   * Функция. Клик по селектору
   * @page - страница контекста браузера
   * @selector - аттрибут тэга страницы, по которому производится "клик"
   * @throw - исключение:
   * - аттрибут тэга не найден;
   * - аттриюут тэга некликабелен;
   * - непредвиденная ошибка
   */
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Error. Selector is not clickable: ${selector}`);
    }
  },

  /**
   * Функция. Проверки наличия аттрибута "disabled" у тэга
   * @page - страница контекста браузера
   * @selector - значение аттрибута тэга страницы, у которого проверяется свойство "disabled"
   * @throw - исключение:
   * - аттрибут тэга не найден;
   * - непредвиденная ошибка
   */
  checkElementDisabled: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      /** Если находим селектор, значит тэг имеет аттрибут "disable", тэг не кликабельный.
       *  Принудительно инициируем ошибку (для теста)
       */
      throw new Error();
    } catch (error) {
      /** Если селектор не найден, срабатывает таймаут.
       *  Элемент НЕ в состоянии "disable" - не имеет такого аттрибута,
       *  либо другая ошибка
       */
      if (error.name !== "TimeoutError") {
        throw new Error(`Error. Selector is not clickable: ${selector}`);
      }
    }
  },

  /**
   * Функция в данной работе не используется
   */
  getDayToTimestamp: function (addDay) {
    try {
      let dateNow = new Date();

      let dateNowTrim = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate() + addDay,
        0,
        0,
        0
      );

      return dateNowTrim.valueOf() / 1000;
    } catch (error) {
      throw new Error(`Not possible convert day to timestamp`);
    }
  },
};
