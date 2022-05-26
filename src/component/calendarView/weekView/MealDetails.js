import React, { useEffect, useState } from "react";
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getNameOfMonth } from "../../../utils/CalendarUtils";
import Check from "../../../img/Check.svg"
import ProgressBar from "../component/ProgressBar";

const MealDetails = ({ time, type, listOfMeals, calories }) => {
    return (
        <>
            <div className="bg-blue-10 w-6/6 h-[1px] mb-[15px]"></div>
            <div className="flex justify-between mb-[15px]">
                <p className="font-roboto font-light text-blue-50 text-verysmall">{time}</p>
                <p className="font-roboto font-light text-blue-100 text-verysmall">{type}</p>
            </div>
            <div className="flex flex-col">
                {listOfMeals.map((meal, index) => (
                    <p className="font-roboto font-semibold text-blue-100 text-small text-center mb-[10px]">{meal}</p>
                ))
                }
            </div>
            <p className="font-roboto font-light text-blue-100 text-small mt-[15px] mb-[15px] text-right">{calories} kcal</p>

        </>
    );
}

export default MealDetails;
