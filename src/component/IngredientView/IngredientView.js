import React, { useEffect, useState } from "react";
import { db } from "../../configs/firebase"
import IngredientServices from "../../services/IngredientServices";
import IngredientComonent from "./component/IngredientComponent";
import SearchIgredient from "./component/SearchIngredient";
import AddCircle from "../../img/addCircle.svg";
import AddIngredientPopUp from "./component/AddIngredientPopUp";
import { where, query, collection, getDocs } from "firebase/firestore";
import Search from "../../img/Search.svg"

const IngredientView = () => {
    const [ingredients, setIngredients] = useState([]);
    const [lastKey, setLastKey] = useState(undefined);
    const [nextIngredients_loading, setNextIngredientsLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [isSearch, setIsSearch] = useState(false)

    useEffect(() => {
        getIngredientsFirstBatch()
    }, []);

    const getIngredientsFirstBatch = () => {
        IngredientServices.ingredientsFirstBatch()
            .then((res) => {
                setIngredients(res.ingredients);
                setLastKey(res.lastKey);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
 * used to apply pagination on posts
 * @param {String} key
 * @return next batch of posts (+5 posts)
 * will be fired when user click on 'More Posts' button.
 */
    const fetchMoreIngredients = (key) => {
        if (!key) {
            return;
        }

        setNextIngredientsLoading(true);
        IngredientServices.ingredientsNextBatch(key)
            .then((res) => {
                setLastKey(res.lastKey);
                setIngredients(ingredients.concat(res.ingredients));
                setNextIngredientsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setNextIngredientsLoading(false);
            });

    };

    const getAllIngredients = (
        <div className="grid grid-cols-4 gap-6 mt-[15px] justify-center">
            {ingredients.map(ingredient => (
                <IngredientComonent ingredient={ingredient} />
            ))}
        </div>
    )

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = async () => {
        setIsSearch(true)
        if (search) {
            try {
                const first = query(collection(db, "ingredients"), where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
                const documentSnapshots = await getDocs(first);

                let ingredients = [];

                documentSnapshots.forEach((doc) => {
                    ingredients.push({
                        id: doc.id,
                        calories: doc.data().calories,
                        carbohydrate: doc.data().carbohydrate,
                        fat: doc.data().fat,
                        fiber: doc.data().fiber,
                        name: doc.data().name,
                        protein: doc.data().protein,
                        size: doc.data().size,
                        sugars: doc.data().sugars
                    });
                });

                console.log(ingredients)
                setIngredients(ingredients)
                return { ingredients: ingredients };
            } catch (e) {
                console.log(e);
            }

        } else {
            setIsSearch(false)
            getIngredientsFirstBatch()
        }

    }

    return (
        <>
            <div className="">
                <div className="py-[50px] px-[200px]">
                    <div className="flex justify-center mb-[25px]">
                        <p className="font-roboto text-blue-100 text-base font-normal">List of ingredients</p>
                    </div>

                    <div className="flex justify-between">
                        <SearchIgredient onChangeSearch={onChangeSearch} />
                        <button type="button" class="flex flex-row place-items-center justify-center bg-white drop-shadow-basic w-2/12 rounded-20 hover:bg-blue-50 hover:text-white ml-[-60px]"
                            onClick={handleSearch}>
                            <p className="font-roboto text-blue-100 text-base font-normal mr-2">Search</p>
                            <img className="w-[24px] mr-2" src={Search} alt="" />
                        </button>
                        <button type="button" class="flex flex-row place-items-center justify-center bg-blue-100 w-3/12 rounded-20 hover:bg-blue-50"
                            onClick={() => setOpen(true)}>
                            <p className="font-roboto text-white text-base font-normal mr-2">Add new ingredient</p>
                            <img className="w-[24px] mr-2" src={AddCircle} alt="" />
                        </button>
                    </div>
                    <AddIngredientPopUp isOpen={open} onClose={() => setOpen(false)}>
                        Fancy Modal
                    </AddIngredientPopUp>

                    <div>{getAllIngredients}</div>
                    <div style={{ textAlign: "center" }}>
                        {ingredients.length === 0 &&
                            <span className=" font-roboto text-blue-100 text-base font-semibold ">Lack of matching data</span>
                        }
                        {nextIngredients_loading && (<p>Loading..</p>)}
                        {!nextIngredients_loading && !isSearch && lastKey && (
                            <button className="bg-white drop-shadow-basic rounded-20 py-[10px] px-[100px] mt-[30px] font-roboto text-blue-100 text-base font-semibold hover:bg-blue-100 hover:text-white"
                                onClick={() => fetchMoreIngredients(lastKey)}>
                                More ingredients
                            </button>
                        )}
                        {!nextIngredients_loading && !lastKey && (
                            <span className=" font-roboto text-blue-100 text-base font-semibold mt-[25px]">You are up to date!</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IngredientView;