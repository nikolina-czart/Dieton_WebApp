import React, { useEffect, useState } from "react";
import MonthView from "./calendarMonth/MonthView";
import nextButton from "../../img/nextButton.svg"
import { calendar } from "../../utils/CalendarUtils";
import WeekView from "./weekView/WeekView";
import DayView from "./dayView/DayView";

const Calendar = () => {
    const [selectedView, setSelectedView] = useState("month");

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDay()

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [day, setDay] = useState(currentDay);

    const monthCalendar = calendar(new Date(year, month))
    const dateRange = monthCalendar[0][0][0] + " " + monthCalendar[0][0][1] + " - " + monthCalendar[monthCalendar.length - 1][6][0] + " " + monthCalendar[monthCalendar.length - 1][6][1]

    function getNameOfMonth(year, month) {
        return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));
    }

    const handlePreviousMonth = () => {
        setMonth(month - 1)
        if (month <= 0) {
            setMonth(11)
            setYear(year - 1)
        }
        console.log(month, year)
    };

    const handleNextMonth = () => {
        setMonth(month + 1)
        if (month >= 11) {
            setMonth(0)
            setYear(year + 1)
        }
        console.log(month, year)
    };

    if (selectedView === "month") {
        return (
            <div className="py-[50px] px-[200px]">
                <div className="flex items-center justify-between h-[32px]">
                    <div className="w-[300px] h-[32px] bg-white drop-shadow-basic flex row items-center justify-between rounded-10 divide-x">
                        <button className="w-1/3 h-[32px] font-roboto bg-blue-100 text-white text-base font-semibold rounded-l-10">Month</button>
                        <button className="w-1/3 h-[32px] font-roboto text-blue-100  text-base font-semibold rounded-tr-10 rounded-bl-10 hover:bg-blue-10 hover:text-bg-blue-100">Week</button>
                        <button className="w-1/3 h-[32px] font-roboto text-blue-100 text-base font-semibold rounded-r-10 hover:bg-blue-10 hover:text-bg-blue-100">Day</button>
                    </div>

                    <div className="flex justify-center">
                        <p className="font-roboto text-blue-100 text-base font-normal">Calendar - {getNameOfMonth(year, month)} {year}</p>
                    </div>

                    <div className="w-[300px] h-[32px] flex row items-center justify-between">
                        <div className="w-[32px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10" onClick={handlePreviousMonth}>
                            <img className="w-auto rotate-180" src={nextButton} alt="" />
                        </div>
                        <div className="w-[210px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10">
                            <p className="font-roboto text-blue-100 text-base font-normal">{dateRange}</p>
                        </div>
                        <div className="w-[32px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10" onClick={handleNextMonth}>
                            <img className="w-auto" src={nextButton} alt="" />
                        </div>
                    </div>

                </div>
                {/* <MonthView monthCalendar={monthCalendar} /> */}
                <WeekView monthCalendar={monthCalendar} />
                {/* <DayView /> */}
            </div>
        );
    }


    return (
        <div className="py-[50px] px-[200px]">
            <div className="flex items-center justify-between h-[32px]">
                <div className="w-[300px] h-[32px] bg-white drop-shadow-basic flex row items-center justify-between rounded-10 divide-x">
                    <button className="w-1/3 h-[32px] font-roboto bg-blue-100 text-white text-base font-semibold rounded-l-10">Month</button>
                    <button className="w-1/3 h-[32px] font-roboto text-blue-100  text-base font-semibold rounded-tr-10 rounded-bl-10 hover:bg-blue-10 hover:text-bg-blue-100">Week</button>
                    <button className="w-1/3 h-[32px] font-roboto text-blue-100 text-base font-semibold rounded-r-10 hover:bg-blue-10 hover:text-bg-blue-100">Day</button>
                </div>

                <div className="flex justify-center">
                    <p className="font-roboto text-blue-100 text-base font-normal">Calendar - {getNameOfMonth(year, month)} {year}</p>
                </div>

                <div className="w-[300px] h-[32px] flex row items-center justify-between">
                    <div className="w-[32px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10" onClick={handlePreviousMonth}>
                        <img className="w-auto rotate-180" src={nextButton} alt="" />
                    </div>
                    <div className="w-[210px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10">
                        <p className="font-roboto text-blue-100 text-base font-normal">{dateRange}</p>
                    </div>
                    <div className="w-[32px] h-[32px] bg-white drop-shadow-basic flex items-center justify-center rounded-10" onClick={handleNextMonth}>
                        <img className="w-auto" src={nextButton} alt="" />
                    </div>
                </div>

            </div>
            {/* <MonthView monthCalendar={monthCalendar} /> */}
            <WeekView monthCalendar={monthCalendar} />
            {/* <DayView /> */}
        </div>
    );
}


export default Calendar;