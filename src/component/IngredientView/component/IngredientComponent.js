import NutritionalRow from "./NutritionalRow";
import Calorie from "../../../img/calorie.svg"
import Size from "../../../img/size.svg"
import ImportantIngredientRow from "./ImportantIngredientRow";

const IngredientComonent = ({ ingredient }) => (
    <div className="flex justify-center flex-col bg-white drop-shadow-basic rounded-[15px] p-[15px]">
        <p className="font-roboto text-center text-blue-100 text-base font-semibold mb-[15px]">{ingredient.name}</p>
        <NutritionalRow name={"Protein"} value={ingredient.protein} />
        <NutritionalRow name={"Fat"} value={ingredient.fat} />
        <NutritionalRow name={"Carbohydrate"} value={ingredient.carbohydrate} />
        <NutritionalRow name={"Fiber"} value={ingredient.fiber} />
        <NutritionalRow name={"Sugars"} value={ingredient.sugars} />
        <div className="flex justify-between mt-[15px]">
            <ImportantIngredientRow title={"Calories"} img={Calorie} value={ingredient.calories} unit={"kcal"} />
            <ImportantIngredientRow title={"Size"} img={Size} value={ingredient.size} unit={"g"} />
        </div>
    </div>

);


export default IngredientComonent;