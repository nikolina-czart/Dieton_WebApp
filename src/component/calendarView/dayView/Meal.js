import MealRow from "./elements/MealRow";

const Meal = ({ type }) => {

    return (
        <div className="w-auto mb-[25px]">
            <p className="font-roboto text-blue-100 text-meal font-extrabold mb-[20px]">{type} </p>
            <MealRow calories={"400"} name={"Pancake a'la bounty with raspberries"} />
        </div >
    );
}

export default Meal;