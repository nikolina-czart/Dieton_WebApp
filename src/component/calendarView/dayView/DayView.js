import React, { useEffect, useState } from "react";
import { calendar, daysOfTheWeek } from "../../../utils/CalendarUtils";
import MealList from "./MealList";
import NutririonalList from "./NuritionalList";

const DayView = ({ }) => {

    return (
        <div className="flex justify-between mt-[60px] content-start">
            <MealList />
            <NutririonalList />
        </div>
    );
}


export default DayView;