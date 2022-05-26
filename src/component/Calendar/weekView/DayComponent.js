import React, { useEffect, useState } from "react";
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getNameOfMonth } from "../../../utils/CalendarUtils";
import Check from "../../../img/Check.svg"

const DayComponent = ({ dayNumber, monthName, monthNumber, yearNumber }) => {
    const value = 100
    const maxValue = 1000

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()
    const progressBarColorTrail = "#2B255A1A"

    function isCurrentDay() {
        if (dayNumber === currentDay && monthNumber === currentMonth && yearNumber === currentYear) {
            return true
        }
        return false
    }

    function isDateBeforeToday(date) {
        return new Date(date.toDateString()) < new Date(new Date().toDateString());
    }

    function getProgressBarColor() {
        if (value >= maxValue - 100 && value <= maxValue + 100) {
            return "#9FD276"
        } else if (value > maxValue + 100) {
            return "#E76057"
        }

        return "#2B255A"
    }


    return (
        <>
            <div>
                {isCurrentDay() ?
                    <div className="bg-blue-100 w-[140px] drop-shadow-basic rounded-20 p-[15px]">
                        <p className="font-roboto text-right text-white text-small font-bold mb-[15px]">{dayNumber} {monthName}</p>

                        <div className="w-full h-[95px] bg-blue-100 flex items-center justify-center">
                            <div className="w-[90px] h-[90px] place-self-center ">
                                <CircularProgressbarWithChildren
                                    value={value}
                                    maxValue={maxValue}
                                    strokeWidth={10}

                                    styles={{
                                        path: {
                                            stroke: "#F29F1D",
                                            strokeLinecap: 'round',
                                            // // Rotate the path
                                            // transform: 'rotate(0.25turn)',
                                            // transformOrigin: 'center center',
                                        },
                                        trail: {
                                            stroke: "#C4C4C44D",
                                            strokeLinecap: 'butt',
                                            // Rotate the trail
                                        }
                                    }}>
                                    <p className="font-roboto text-white text-base font-bold">{value}</p>
                                    <p className="font-roboto text-white text-small font-normal">/{maxValue}</p>
                                </CircularProgressbarWithChildren >
                            </div>
                        </div>
                    </div>
                    :
                    <div className="bg-white w-[140px] drop-shadow-basic rounded-20 p-[15px]">
                        <p className="font-roboto text-right text-blue-100 text-small font-normal mb-[15px]">{dayNumber} {monthName}</p>

                        <div className="w-full h-[95px] bg-white flex items-center justify-center">
                            <div className="w-[90px] h-[90px] place-self-center ">
                                <CircularProgressbarWithChildren
                                    value={value}
                                    maxValue={maxValue}
                                    strokeWidth={10}

                                    styles={{
                                        path: {
                                            stroke: getProgressBarColor(),
                                            strokeLinecap: 'round',
                                            // // Rotate the path
                                            // transform: 'rotate(0.25turn)',
                                            // transformOrigin: 'center center',
                                        },
                                        trail: {
                                            stroke: progressBarColorTrail,
                                            strokeLinecap: 'butt',
                                            // Rotate the trail
                                        }
                                    }}>
                                    <p className="font-roboto text-blue-100 text-base font-bold">{value}</p>
                                    <p className="font-roboto text-blue-100 text-small font-normal">/{maxValue}</p>
                                </CircularProgressbarWithChildren >
                                {isDateBeforeToday(new Date(yearNumber, monthNumber, dayNumber)) &&
                                    <img className="z-10 w-[48px] mt-[-35px] ml-[50px]" src={Check} alt="" />}
                            </div>
                        </div>
                    </div>
                }
            </div>

        </>

    );
}

export default DayComponent;