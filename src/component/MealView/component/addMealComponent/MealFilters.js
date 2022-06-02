import React, { useState, useRef } from "react";

import CheckBoxGroup from "../checkbox/CheckBoxGroup";

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

    const handleReset = (e) => {
        e.preventDefault();
        setTypesOfMeal([
            { id: 1, checked: false, type: "Breakfast" },
            { id: 2, checked: false, type: "Lunch" },
            { id: 3, checked: false, type: "Dinner" },
            { id: 4, checked: false, type: "Supper" },
            { id: 5, checked: false, type: "Snacks" },
            { id: 6, checked: false, type: "Other" },
        ])
        setLimits([
            { id: 1, checked: false, type: "Vegetarian" },
            { id: 2, checked: false, type: "Vegan" },
            { id: 3, checked: false, type: "Lactose-free" },
        ])
        setDifficultyLevel([
            { id: 1, checked: false, type: "Easy" },
            { id: 2, checked: false, type: "Medium" },
            { id: 3, checked: false, type: "Hard" },
        ])

        setCaloriesRangeMin("")
        setCaloriesRangeMax("")
        setMinutesRangeMin("")
        setMinutesRangeMax("")

    };

    return (
        <div>
            <p className="font-roboto text-blue-100 text-verysmall font-thin">Filters</p>
            <CheckBoxGroup title="Type of meal" data={typesOfMeal} toggleDate={(e) => toggleDate(e, typesOfMeal, "typesOfMeal")} />
            <CheckBoxGroup title="Limits" data={limits} toggleDate={(e) => toggleDate(e, limits, "limits")} />
            <CheckBoxGroup title="Difficulty level" data={difficultyLevel} toggleDate={(e) => toggleDate(e, difficultyLevel, "difficultyLevel")} />
        </div>


    )
}

export default MealFilters;
