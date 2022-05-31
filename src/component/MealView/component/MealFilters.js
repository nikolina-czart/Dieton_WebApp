import React, { useState, useRef } from "react";
import Checkbox from "./checkbox/CheckBox";
import CheckBoxGroup from "./checkbox/CheckBoxGroup";
import Input from "./Input"

const MealFilters = () => {
    const [typesOfMeal, setTypesOfMeal] = useState([
        { id: 1, checked: false, type: "Breakfast" },
        { id: 2, checked: false, type: "Lunch" },
        { id: 3, checked: false, type: "Dinner" },
        { id: 4, checked: false, type: "Supper" },
        { id: 5, checked: false, type: "Snacks" },
        { id: 6, checked: false, type: "Other" },
    ])
    const [limits, setLimits] = useState([
        { id: 1, checked: false, type: "Vegetarian" },
        { id: 2, checked: false, type: "Vegan" },
        { id: 3, checked: false, type: "Lactose-free" },
    ])
    const [difficultyLevel, setDifficultyLevel] = useState([
        { id: 1, checked: false, type: "Easy" },
        { id: 2, checked: false, type: "Medium" },
        { id: 3, checked: false, type: "Hard" },
    ])

    const [caloriesRangeMin, setCaloriesRangeMin] = useState("")
    const [caloriesRangeMax, setCaloriesRangeMax] = useState("")
    const [minutesRangeMin, setMinutesRangeMin] = useState("")
    const [minutesRangeMax, setMinutesRangeMax] = useState("")

    const onChangeCalorieMin = (e) => {
        setCaloriesRangeMin(e.target.value)
    }

    const onChangeCalorieMax = (e) => {
        setCaloriesRangeMax(e.target.value)
    }

    const onChangeMinutesMin = (e) => {
        setMinutesRangeMin(e.target.value)
    }

    const onChangeMinutesMax = (e) => {
        setMinutesRangeMax(e.target.value)
    }

    function toggleDate(e, data, selector) {
        const { name } = e.target;
        const tempData = [...data];

        data.forEach((date) => {
            if (date.type === name) {
                date.checked = !date.checked;
            }
        });

        switch (selector) {
            case "typesOfMeal":
                setTypesOfMeal(tempData);
                break;
            case "limits":
                setLimits(tempData)
                break;
            case "difficultyLevel":
                setDifficultyLevel(tempData)
                break;
            default:
            // code block
        }

    }

    const getSelectedData = (data) => {
        const selectedData = [];
        data
            .filter((date) => date.checked)
            .forEach((date) => {
                selectedData.push({ ...date });
            });

        return selectedData;
    }

    const handleFilter = (e) => {
        e.preventDefault();

        const selectedTypesOfMeal = getSelectedData(typesOfMeal);
        const selectedLimits = getSelectedData(limits);
        const selectedDifficultyLevel = getSelectedData(difficultyLevel);

        console.log("caloriesRangeMin: ", caloriesRangeMin)
        console.log("caloriesRangeMax: ", caloriesRangeMax)
        console.log("minutesRangeMin: ", minutesRangeMin)
        console.log("minutesRangeMax: ", minutesRangeMax)
        console.log("selectedTypesOfMeal: ", selectedTypesOfMeal)
        console.log("selectedLimits: ", selectedLimits)
        console.log("selectedDifficultyLevel: ", selectedDifficultyLevel)
    };

    return (
        <div>
            <p className="font-roboto text-blue-100 text-small font-semibold ">Filters</p>
            <div className="flex flex-row mt-[5px]">
                <p className="font-roboto text-blue-100 text-small font-normal mt-[10px] mr-1">Calories:</p>
                <Input label="from" onChangeInput={onChangeCalorieMin} type="Number" />
                <p className="font-roboto text-blue-100 text-small font-normal mt-[10px] mr-1 ml-1">-</p>
                <Input label="to" onChangeInput={onChangeCalorieMax} type="Number" />
            </div>
            <div className="flex flex-row mt-[5px]">
                <p className="font-roboto text-blue-100 text-small font-normal mt-[10px] mr-1">Minutes:</p>
                <Input label="from" onChangeInput={onChangeMinutesMin} type="Number" />
                <p className="font-roboto text-blue-100 text-small font-normal mt-[10px] mr-1 ml-1">-</p>
                <Input label="to" onChangeInput={onChangeMinutesMax} type="Number" />
            </div>
            <CheckBoxGroup title="Type of meal" data={typesOfMeal} toggleDate={(e) => toggleDate(e, typesOfMeal, "typesOfMeal")} />
            <CheckBoxGroup title="Limits" data={limits} toggleDate={(e) => toggleDate(e, limits, "limits")} />
            <CheckBoxGroup title="Difficulty level" data={difficultyLevel} toggleDate={(e) => toggleDate(e, difficultyLevel, "difficultyLevel")} />
            <button onClick={handleFilter}>Click me</button>
        </div>


    )
}

export default MealFilters;
