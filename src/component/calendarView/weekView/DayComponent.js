import React, { useEffect, useState } from "react";
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getNameOfMonth } from "../../../utils/CalendarUtils";
import Check from "../../../img/Check.svg"
import ProgressBar from "../component/ProgressBar";
import MealList from "./MealsList";
import { calendarMonth, daysOfTheWeek } from "../../../utils/CalendarUtils";

const DayComponent = ({ dayNumber, monthName, monthNumber, yearNumber }) => {
    const value = 500
    const maxValue = 1000

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()


    function isCurrentDay() {
        if (dayNumber === currentDay && monthNumber === currentMonth && yearNumber === currentYear) {
            return true
        }
        return false
    }

    function getCurrentDayNumber() {
        const currentDayNumber = currentDate.getDay()
        if (currentDayNumber === 0) {
            return 7;
        }
        return currentDayNumber;
    }

    function getProgressBarColor() {
        if (value >= maxValue - 100 && value <= maxValue + 100) {
            return "#9FD276"
        } else if (value > maxValue + 100) {
            return "#E76057"
        }

        return "#2B255A"
    }

    function getProgressValue() {
        let progressValue = (value / maxValue) * 100;
        if (progressValue > 100) {
            return 100;
        }
        return progressValue;
    }

    function isDateBeforeToday(date) {
        return new Date(date.toDateString()) < new Date(new Date().toDateString());
    }

    return (
        <>
            <div>
                {isCurrentDay() &&
                    <div className="bg-blue-100 w-[140px] h-[70px] rounded-t-20 mt-[-50px] flex justify-center">
                        <p className="font-roboto text-white text-base font-semibold mt-[10px]">{daysOfTheWeek[getCurrentDayNumber() - 1]}</p>
                    </div>}

                <div className={isCurrentDay() ? "bg-white w-[140px] drop-shadow-basic rounded-b-20 rounded-tr-20 p-[15px] mt-[-20px] z-10" : "bg-white w-[140px] drop-shadow-basic rounded-20 p-[15px] z-10"}>
                    <p className="font-roboto text-right text-blue-100 text-small font-normal mb-[15px] mt-[10px]">{dayNumber} {monthName}</p>
                    {isDateBeforeToday(new Date(yearNumber, monthNumber, dayNumber)) &&
                        <img className="z-10 w-[48px] mt-[-45px] " src={Check} alt="" />}
                    <ProgressBar bgcolor={getProgressBarColor()} progress={getProgressValue()} height={10} />
                    <div className="flex justify-center mt-[10px] mb-[20px]">
                        <p className="font-roboto text-blue-100 text-small font-bold mr-1">{value} </p>
                        <p className="font-roboto text-blue-50 text-small font-normal">/ {maxValue}</p>
                    </div>
                    <MealList />
                </div>
            </div>

        </>
    );
}

export default DayComponent;