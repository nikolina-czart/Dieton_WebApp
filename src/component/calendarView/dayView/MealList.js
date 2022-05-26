import Meal from "./Meal";

const MealList = () => {
    const list = ["Pancake a'la bounty with raspberries", "Pancake a'la bounty with raspberries"]

    return (
        <div className="w-1/2 pr-[15px]">
            <Meal type={"Breakfast"} />
            <Meal type={"Lunch"} />
            <Meal type={"Dinner"} />
            <Meal type={"Supper"} />
            <Meal type={"Snack"} />
        </div>
    );
}

export default MealList;