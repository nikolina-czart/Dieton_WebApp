import NutririonalRow from "./elements/NuritionalRow";

const NutririonalList = () => {
    const list = ["Pancake a'la bounty with raspberries", "Pancake a'la bounty with raspberries"]

    return (
        <div className="flex flex-col justify-center w-1/2 pl-[15px]">
            <p className="font-roboto text-blue-100 text-meal font-extrabold mb-[20px]">Basic nuritional values</p>
            <NutririonalRow title={"Energy value (kcal)"} value={400} maxValue={5000} jednostka={" kcal"} />
            <NutririonalRow title={"Total protein (g)"} value={70} maxValue={75} jednostka={" %"} />
        </div>
    );
}

export default NutririonalList;