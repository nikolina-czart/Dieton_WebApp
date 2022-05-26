import React, { useEffect, useState, Strarw } from "react";
import nextButton from "../../img/nextButton.svg"
import { calendarMonth } from "../../utils/CalendarUtils";
import MonthView from "./monthView/MonthView";
import WeekView from "./weekView/WeekView";
import DayView from "./dayView/DayView";
import ViewSwitcher from "./component/ViewSwitcher";

const CalendarView = () => {
    const [selectedView, setSelectedView] = useState("month");

    const monthDate = new Date()
    const [monthViewMonth, setMonthViewMonth] = useState(monthDate.getMonth());
    const [monthViewYear, setMonthViewYear] = useState(monthDate.getFullYear());
    const [monthViewDay, setMonthViewDay] = useState(monthDate.getDay());

    const monthCalendar = calendarMonth(new Date(monthViewYear, monthViewMonth))





    function getNameOfMonth(year, month) {
        return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));
    }

    function handleChangeView(newView) {
        setSelectedView(newView);
    }

    const getTitleView = () => {
        if (selectedView === "month") {
            // return "Month"
            return "Calendar - " + getNameOfMonth(monthViewYear, monthViewMonth) + " " + monthViewYear
        } else if (selectedView === "week") {
            return "Calendar - " + getNameOfMonth(weekViewYear, weekViewMonth) + " " + monthViewYear
        } else if (selectedView === "day") {
            return "Calendar - " + getNameOfMonth(dayViewYear, dayViewMonth) + " " + dayViewYear
        }
    }

    const getDateRange = () => {
        if (selectedView === "month") {
            return monthCalendar[0][0][0] + " " + monthCalendar[0][0][1] + " - " + monthCalendar[monthCalendar.length - 1][6][0] + " " + monthCalendar[monthCalendar.length - 1][6][1]
        } else if (selectedView === "week") {
            return weekCalendar[0][0] + " " + weekCalendar[0][1] + " - " + weekCalendar[6][0] + " " + weekCalendar[6][1]
        } else if (selectedView === "day") {
            return dayViewDay + " " + getNameOfMonth(dayViewYear, dayViewMonth) + " " + dayViewYear
        }
    }

    const getView = () => {
        if (selectedView === "month") {
            return <MonthView monthCalendar={monthCalendar} month={monthViewMonth} />
        } else if (selectedView === "week") {
            return <WeekView weekCalendar={weekCalendar} />
        } else if (selectedView === "day") {
            return <DayView />
        }
    }

    const previousMonth = () => {
        setMonthViewMonth(monthViewMonth - 1)
        if (monthViewMonth <= 0) {
            setMonthViewMonth(11)
            setMonthViewYear(monthViewYear - 1)
        }
    };

    const nextMonth = () => {
        setMonthViewMonth(monthViewMonth + 1)
        if (monthViewMonth >= 11) {
            setMonthViewMonth(0)
            setMonthViewYear(monthViewYear + 1)
        }
    };

    function getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0);
    }

    const weekDate = new Date()
    const [weekViewMonth, setWeekViewMonth] = useState(weekDate.getMonth());
    const [weekViewYear, setWeekViewYear] = useState(weekDate.getFullYear());
    const [weekViewDay, setWeekViewDay] = useState(weekDate.getDate());


    const getWeekNumOfMonthOfDate = (d) => {
        let firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
        if (firstDay === 0) {
            firstDay = 7;
        }
        console.log((d.getDate()))
        console.log(Math.ceil((d.getDate()) / 7))
        return Math.ceil((d.getDate()) / 7);
    }

    const numberWeekInMonth = getWeekNumOfMonthOfDate(new Date(weekViewYear, weekViewMonth, weekViewDay))
    const [currentWeekNumber, setCurrentWeekNumber] = useState(numberWeekInMonth)


    const previousWeek = () => {
        var date = new Date(weekViewYear, weekViewMonth, weekViewDay);
        date.setDate(date.getDate() - 7);
        setWeekViewYear(date.getFullYear())
        setWeekViewMonth(date.getMonth())
        setWeekViewDay(date.getDate())
        setCurrentWeekNumber(getWeekNumOfMonthOfDate(new Date(date.getFullYear(), date.getMonth(), date.getDate())))
    };

    function getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    const nextWeek = () => {
        var date = new Date(weekViewYear, weekViewMonth, weekViewDay);
        date.setDate(date.getDate() + 7);
        setWeekViewYear(date.getFullYear())
        setWeekViewMonth(date.getMonth())
        setWeekViewDay(date.getDate())
        setCurrentWeekNumber(getWeekNumOfMonthOfDate(new Date(date.getFullYear(), date.getMonth(), date.getDate())))

    };

    const lastDayOfMonth = getLastDayOfMonth(weekViewYear, weekViewMonth)

    const weekCalendar = calendarMonth(new Date(weekViewYear, weekViewMonth))[currentWeekNumber - 1]

    const dayDate = new Date()
    const [dayViewMonth, setDayViewMonth] = useState(dayDate.getMonth());
    const [dayViewYear, setDayViewYear] = useState(dayDate.getFullYear());
    const [dayViewDay, setDayViewDay] = useState(dayDate.getDate());

    const previousDay = () => {
        var date = new Date(dayViewYear, dayViewMonth, dayViewDay);
        date.setDate(date.getDate() - 1);
        setDayViewYear(date.getFullYear())
        setDayViewMonth(date.getMonth())
        setDayViewDay(date.getDate())
    };

    const nextDay = () => {
        var date = new Date(dayViewYear, dayViewMonth, dayViewDay);
        date.setDate(date.getDate() + 1);
        setDayViewYear(date.getFullYear())
        setDayViewMonth(date.getMonth())
        setDayViewDay(date.getDate())
    };

    const handlePrevious = () => {
        if (selectedView === "month") {
            previousMonth()
        } else if (selectedView === "week") {
            previousWeek()
        } else if (selectedView === "day") {
            previousDay()
        }
    };

    const handleNext = () => {
        if (selectedView === "month") {
            nextMonth()
        } else if (selectedView === "week") {
            nextWeek()
        } else if (selectedView === "day") {
            nextDay()
        }
    };


    return (
        <div className="py-[50px] px-[200px]">
            <div className="flex items-center justify-between h-[32px]">
                <ViewSwitcher selectedView={selectedView} setView={handleChangeView} />

                <div className="flex justify-center">
                    <p className="font-roboto text-blue-100 text-base font-normal">{getTitleView()}</p>
                </div>

                <div className="w-[300px] h-[32px] flex row items-center justify-between">
                    <div className="w-[32px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10" onClick={handlePrevious}>
                        <img className="w-auto rotate-180" src={nextButton} alt="" />
                    </div>
                    <div className="w-[210px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10">
                        <p className="font-roboto text-blue-100 text-base font-normal">{getDateRange()}</p>
                    </div>
                    <div className="w-[32px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10" onClick={handleNext}>
                        <img className="w-auto" src={nextButton} alt="" />
                    </div>
                </div>

            </div>
            {getView()}

        </div>
    );


}

export default CalendarView;





