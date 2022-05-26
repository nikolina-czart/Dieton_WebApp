
const calendarMonth = (date) => {

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()
    const currentDay = date.getDay()
    const beforeMonth = date.getMonth() - 1
    const nextMonth = date.getMonth() + 1

    const nameOfMonthUS = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    let firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth).getDay()
    const daysInMonth = getLastDayOfMonth(currentYear, currentMonth).getDate()
    const lastDayOfMonth = getLastDayOfMonth(currentYear, currentMonth).getDay()

    if (firstDayOfMonth === 0) {
        firstDayOfMonth = 7;
    }

    const allCells = daysInMonth + firstDayOfMonth - 1;

    let monthCalendar = new Array()
    let row = new Array()

    const daysInBeforeMonth = getLastDayOfMonth(currentYear, currentMonth - 1).getDate()
    const daysInAfterMonth = getLastDayOfMonth(currentYear, currentMonth + 1).getDate()

    for (let i = 0; i < firstDayOfMonth - 1; i++) {
        row.push([daysInBeforeMonth - i, getNameOfMonth(currentYear, beforeMonth), beforeMonth, currentYear])
    }

    row.reverse()

    for (let j = firstDayOfMonth; j <= allCells; j++) {
        row.push([j - firstDayOfMonth + 1, getNameOfMonth(currentYear, currentMonth), currentMonth, currentYear])
        if (j % 7 === 0) {
            monthCalendar.push(row)
            row = new Array()
        }
    }

    if (!(row.length === 7)) {
        const rowLength = row.length
        for (let k = 0; k < 7 - rowLength; k++) {
            row.push([k + 1, getNameOfMonth(currentYear, nextMonth), nextMonth, currentYear])
        }
    }
    monthCalendar.push(row)

    return monthCalendar
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
}

function getNameOfMonth(year, month) {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));
}

const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]



export { daysOfTheWeek, calendarMonth, getNameOfMonth, }