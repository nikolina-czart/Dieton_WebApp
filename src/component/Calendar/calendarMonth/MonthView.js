import React, { useEffect, useState } from "react";
import { calendar, daysOfTheWeek } from "../../../utils/CalendarUtils";
import DayComponent from "./DayComponent";

const MonthView = ({ monthCalendar }) => {

    return (
        <>
            <div className="grid grid-cols-7 gap-6 mt-[25px]">
                {daysOfTheWeek.map(dayName => (
                    <div className="w-[140px] flex justify-center">
                        <p className="font-roboto text-blue-100 text-base font-semibold">{dayName}</p>
                    </div>

                ))}
            </div>
            <div className="grid grid-cols-7 gap-6 mt-[15px] flex justify-center">
                {monthCalendar.map(weeks => (
                    weeks.map((day, index) => (
                        <DayComponent key={index} dayNumber={day[0]} monthName={day[1]} monthNumber={day[2]} />
                    ))
                ))
                }

            </div>
        </>

    );
}


export default MonthView;