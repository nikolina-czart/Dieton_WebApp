import MealDetails from "./MealDetails";

const MealList = () => {
    const list = ["Pancake a'la bounty with raspberries", "Pancake a'la bounty with raspberries"]

    return (
        <>
            <MealDetails time={"8:00"} type={"Breakfast"} listOfMeals={list} calories={"450"} />
            <MealDetails time={"8:00"} type={"Breakfast"} listOfMeals={list} calories={"450"} />
            <MealDetails time={"8:00"} type={"Breakfast"} listOfMeals={list} calories={"450"} />
            <div className="bg-blue-10 w-6/6 h-[1px] mt-[15px]"></div>
        </>
    );
}

export default MealList;