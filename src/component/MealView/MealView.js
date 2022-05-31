import React, { useEffect, useState } from "react";
import MealSwitcher from "./component/MealSwitcher";
import AddCircle from "../../img/addCircle.svg"
import MealFilters from "./component/MealFilters";
import MealGird from "./component/MealGrid"

const MealView = () => {
    const [selectedType, setSelectedType] = useState("all");
    const [caloriesRangeMin, setCaloriesRangeMin] = useState(-1)
    const [caloriesRangeMax, setCaloriesRangeMax] = useState(-1)
    const [minutesRangeMin, setMinutesRangeMin] = useState(-1)
    const [minutesRangeMax, setMinutesRangeMax] = useState(-1)
    const [typeOfMeal, setTypeOfMeal] = useState([])
    const [limits, setLimits] = useState([])
    const [difficultyLevel, setDifficultyLevel] = useState([])


    function handleChangeType(e) {
        setSelectedType(e);
    }

    const handleAddMeal = () => {
        console.log(selectedType)
    }

    return (
        <div className="py-[50px] px-[200px]">
            <div className="flex items-center justify-between h-[32px]">
                <MealSwitcher selectedType={selectedType} setType={handleChangeType} />

                <div className="flex justify-center">
                    <p className="font-roboto text-blue-100 text-base font-normal">List of meals</p>
                </div>

                <button type="button" className="h-[32px] flex flex-row place-items-center justify-center bg-blue-100 w-3/12 rounded-20 hover:bg-blue-50"
                    onClick={() => handleAddMeal()}>
                    <p className="font-roboto text-white text-base font-normal mr-2">Add new meal</p>
                    <img className="w-[24px] mr-2" src={AddCircle} alt="" />
                </button>
            </div>

            <div className="flex flex-row mt-[25px]">
                <div className="w-9/12 pr-[25px]">
                    <div className="bg-red-50 w-full  h-[500px]"></div>
                </div>
                <div className="w-3/12">
                    <div className="bg-red-50 w-full  h-[500px]">
                        <MealFilters />
                    </div>
                </div>

                {/* <MealGird />
                <MealFilters /> */}
            </div>

        </div>
    )
}

export default MealView;