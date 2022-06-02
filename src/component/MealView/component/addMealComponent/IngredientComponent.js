import NutritionalRow from "../../../IngredientView/component/NutritionalRow";
import ImportantIngredientRow from "../../../IngredientView/component/ImportantIngredientRow";

const IngredientComonent = ({ ingredient }) => (
    <div className="flex justify-center flex-col bg-white drop-shadow-basic rounded-[15px] p-[15px]">
        <p className="font-roboto text-center text-blue-100 text-base font-semibold mb-[15px]">{ingredient.name}</p>
        <NutritionalRow name={"Protein"} value={ingredient.protein} />
        <NutritionalRow name={"Fat"} value={ingredient.fat} />
        <NutritionalRow name={"Carbohydrate"} value={ingredient.carbohydrate} />
        <NutritionalRow name={"Fiber"} value={ingredient.fiber} />
        <NutritionalRow name={"Sugars"} value={ingredient.sugars} />
    </div>

);


export default IngredientComonent;