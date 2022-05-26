import React, { useEffect, useState } from "react";
import { calendarMonth, daysOfTheWeek } from "../../../utils/CalendarUtils";
import DayComponent from "./DayComponent";


const WeekView = ({ weekCalendar }) => {
    console.log(weekCalendar);

    return (
        <>
            <div className="grid grid-cols-7 gap-6 mt-[25px]">
                {daysOfTheWeek.map(dayName => (
                    <div className="w-[140px] flex justify-center">
                        <p className="font-roboto text-blue-100 text-base font-semibold">{dayName}</p>
                    </div>

                ))}
            </div>
            <div className="grid grid-cols-7 gap-6 mt-[15px] justify-center">
                {weekCalendar.map((day, index) => (
                    <DayComponent key={index} dayNumber={day[0]} monthName={day[1]} monthNumber={day[2]} yearNumber={day[3]} />
                ))
                }

            </div>
        </>

    );
}


export default WeekView;