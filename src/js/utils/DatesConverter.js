export default class DatesConverter {
  // get today function:

  static getToday() {
    const now = new Date(),
      todayDay = now.getDate(),
      todayMonth = now.getMonth(),
      todayYear = now.getFullYear();

    return { day: todayDay, month: todayMonth, year: todayYear };
  }

  // get week function:

  static getWeek(date) {
    const d = new Date(date.year, date.month, date.day);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
  }

  // get first day of week function:

  static getFirstDayOfWeek(w, y) {
    const simple = new Date(y, 0, 1 + (w - 1) * 7),
      dow = simple.getDay(),
      ISOweekStart = simple;

    if (dow <= 4) {
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }

    const year = ISOweekStart.getFullYear(),
      month = ISOweekStart.getMonth(),
      day = ISOweekStart.getDate();

    return { day, month, year };
  }

  // calculate previous date function:

  static calculatePrevDate(baseDate, change) {
    const nextDate = new Date(baseDate.year, baseDate.month, baseDate.day);
    nextDate.setDate(nextDate.getDate() - change);

    const year = nextDate.getFullYear(),
      month = nextDate.getMonth(),
      day = nextDate.getDate();

    return { day, month, year };
  }

  // calculate next date function:

  static calculateNextDate(baseDate, change) {
    const nextDate = new Date(baseDate.year, baseDate.month, baseDate.day);
    nextDate.setDate(nextDate.getDate() + change);

    const year = nextDate.getFullYear(),
      month = nextDate.getMonth(),
      day = nextDate.getDate();

    return { day, month, year };
  }

  // convert date to string function:

  static convertDateToString(date) {
    const year = date.year;
    let month = date.month + 1;
    let day = date.day;

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    const str = day + "." + month + "." + year;

    return str;
  }

  // create cell ID function:

  static createCellId(userName, baseDate, change) {
    const nextDate = new Date(baseDate.year, baseDate.month, baseDate.day);
    nextDate.setDate(nextDate.getDate() + change);

    const year = nextDate.getFullYear();
    let month = nextDate.getMonth();
    let day = nextDate.getDate();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    const str = userName + "" + day + "" + month + "" + year;

    return str;
  }

  // holiday check function:

  static holidayCheck(baseDate) {
    const date = new Date(baseDate.year, baseDate.month, baseDate.day),
      str = date.getDate() + "." + (date.getMonth() + 1),
      fixedHolidays = [
        "1.1",
        "6.1",
        "1.5",
        "3.5",
        "15.8",
        "1.11",
        "11.11",
        "25.12",
        "26.12"
      ];

    if (fixedHolidays.indexOf(str) >= 0) {
      return true;
    }

    const movedHolidays = getEasterDate(date.getFullYear());
    const daysIncremental = [
      0, // Wielkanoc
      1, // Poniedzialek Wielkanocny
      48, // 49 dni po Wielkanocy mamy Zielone Swiatki
      11 // 60 dni po Wielkanocy jest Boze Cialo
    ];

    let i = 0;

    do {
      movedHolidays.setDate(movedHolidays.getDate() + daysIncremental[i]);

      if (
        movedHolidays.getDate() + "." + (movedHolidays.getMonth() + 1) ===
        str
      ) {
        return true;
      }

      i++;
    } while (i < daysIncremental.length);

    return false;

    // get easter date (inner function):

    function getEasterDate(year) {
      year = isNaN(year) ? new Date().getFullYear() : year;
      const a = year % 19,
        b = (year / 100) | 0,
        c = year % 100,
        h =
          (19 * a +
            b -
            ((b / 4) | 0) -
            (((b - (((b + 8) / 25) | 0) + 1) / 3) | 0) +
            15) %
          30,
        l = (32 + 2 * (b % 4) + 2 * ((c / 4) | 0) - h - (c % 4)) % 7,
        m = Math.floor((a + 11 * h + 22 * l) / 451);

      return new Date(
        year,
        Math.floor((h + l - 7 * m + 114) / 31) - 1,
        ((h + l - 7 * m + 114) % 31) + 1
      );
    }
  }
}
