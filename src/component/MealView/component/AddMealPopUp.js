import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Close from "../../../img/Close.svg"
import Save from "../../../img/Save.svg"
import AddCircle from "../../../img/addCircle.svg"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Input from "./addMealComponent/Input";
import { isEmpty, validateEmail } from "../../../utils/ValidateUtils";
import { collection, query, orderBy, startAfter, limit, getDocs, addDoc, where, setDoc, doc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../../../configs/firebase"
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { async } from "@firebase/util";
import AddedPosition from "./addMealComponent/AddedPosition";
import MealFilters from "./addMealComponent/MealFilters";
import NutritionalRow from "./addMealComponent/NutritionalRow";
import ImageUploading from "react-images-uploading";
import CheckBoxGroup from "./checkbox/CheckBoxGroup";
import Search from "./addMealComponent/Search"
import IngredientComonent from "./addMealComponent/IngredientComponent";
import { saveUser } from "../../../redux/slice/authSlice";
import { useSelector, useDispatch } from "react-redux";


const AddMealPopUp = ({ isOpen, onClose }) => {
    let history = useHistory();

    const [showModal, setShowModal] = useState(false)

    const [nameOfMeal, setNameOfMeal] = useState("")
    const [prepartionTime, setPrepartionTime] = useState(null)
    const [recipe, setRecipe] = useState("")

    const [addedPosition, setAddedPosition] = useState([])
    const [totalCalories, setTotaCalories] = useState(0)
    const [protein, setProtein] = useState(0)
    const [fat, setFat] = useState(0)
    const [carbohydrate, setCarbohydrate] = useState(0)
    const [sugars, setSugars] = useState(0)

    const [images, setImages] = useState([]);
    const maxNumber = 1;
    const [search, setSearch] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [ingredients, setIngredients] = useState([]);

    const [ingredientSelected, setIngredientSelected] = useState([])
    const [ingredientCalories, setIngredientCalories] = useState(0)
    const [ingredientSize, setIngredientSize] = useState(0)
    const [ingredientProtein, setIngredientProtein] = useState(0)
    const [ingredientPfat, setIngredientFat] = useState(0)
    const [ingredientCarbohydrate, setIngredientCarbohydrate] = useState(0)
    const [ingredientSugars, setIngredientSugars] = useState(0)

    const onChangeIngredientSize = (e) => {
        setIngredientSize(e.target.value)
    }

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const onChangeNameOfMeal = (e) => {
        setNameOfMeal(e.target.value)
    }

    const onChangePrepartionTime = (e) => {
        setPrepartionTime(e.target.value)
    }

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
                selectedData.push(...selectedData, date.type);
            });


        return selectedData;
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
        }

    }

    const test = (e) => {
        console.log(e)
    }
    const [number, setNumber] = useState(0)

    const handleSaveIngredient = () => {
        const tempCalories = (ingredientSelected.calories * ingredientSize) / ingredientSelected.size
        const tempProtein = (ingredientSelected.protein * ingredientSize) / ingredientSelected.size
        const tempFat = (ingredientSelected.fat * ingredientSize) / ingredientSelected.size
        const tempCarbohydrate = (ingredientSelected.carbohydrate * ingredientSize) / ingredientSelected.size
        const tempSugars = (ingredientSelected.sugars * ingredientSize) / ingredientSelected.size

        setIngredientCalories(tempCalories)
        setIngredientProtein(tempProtein)
        setIngredientFat(tempFat)
        setIngredientCarbohydrate(tempCarbohydrate)
        setIngredientSugars(tempSugars)

        setAddedPosition([...addedPosition,
        { name: ingredientSelected.name, calories: tempCalories, protien: tempProtein, fat: tempFat, carbohydrate: tempCarbohydrate, sugars: tempSugars, size: ingredientSize }
        ])

        const newNumber = number + 1
        setNumber(newNumber)

        setTotaCalories((addedPosition.reduce((a, v) => a = a + v.calories, 0)))
        setProtein((addedPosition.reduce((a, v) => a = a + v.protein, 0)))
        setFat((addedPosition.reduce((a, v) => a = a + v.fat, 0)))
        setCarbohydrate((addedPosition.reduce((a, v) => a = a + v.carbohydrate, 0)))
        setSugars((addedPosition.reduce((a, v) => a = a + v.sugars, 0)))

        setShowModal(false)
        console.log(addedPosition)
    }

    const handleSave = (e) => {
        e.preventDefault();

        const auth = getAuth();
        const uid = auth.currentUser.uid
        console.log(uid)

        const selectedTypesOfMeal = getSelectedData(typesOfMeal);
        const selectedLimits = getSelectedData(limits);
        const selectedDifficultyLevel = getSelectedData(difficultyLevel);

        const docRef = addDoc(collection(db, "meals"), {
            name: nameOfMeal,
            time: prepartionTime,
            totalCalories: Math.round((addedPosition.reduce((a, v) => a = a + v.calories, 0)) * 100) / 100,
            protein: Math.round((addedPosition.reduce((a, v) => a = a + v.protein, 0)) * 100) / 100,
            fat: Math.round((addedPosition.reduce((a, v) => a = a + v.fat, 0)) * 100) / 100,
            carbohydrate: Math.round((addedPosition.reduce((a, v) => a = a + v.carbohydrate, 0)) * 100) / 100,
            sugars: Math.round((addedPosition.reduce((a, v) => a = a + v.sugars, 0)) * 100) / 100,
            recipe: recipe,
            typesOfMeal: selectedTypesOfMeal,
            limits: selectedLimits,
            difficultyLevel: selectedDifficultyLevel,
            imgURL: images[0].data_url,
            ingredients: addedPosition,
            user: uid
        })
        toast.success("Saved product: " + nameOfMeal);
        onClose()

    }

    const onRemoveElement = (name) => {
        setAddedPosition(addedPosition.filter(item => item.name !== name));
    }


    if (!isOpen) return null
    return createPortal(
        <>
            <div className="fixed top-0 left-0 right-0 h-full bg-black opacity-50"></div>
            <div className="grid place-items-center h-screen">
                <div className="flex flex-col w-[900px] h-auto bg-white drop-shadow-basic rounded-20 absolute top-[50px] p-[30px]">
                    <div className="w-full flex justify-end items-start">
                        <button onClick={onClose}>
                            <img className="w-[24px]" src={Close} alt="" />
                        </button>
                    </div>
                    <div className="flex flex-row justify-between h-[500px]">
                        <div className="flex flex-col justify-between w-1/4 px-[10px] ">
                            <div className="flex flex-col">
                                <p className="font-roboto text-blue-100 text-verysmall font-thin ">Add a photo of your meal</p>

                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps
                                    }) => (
                                        // write your building UI
                                        <div className="flex flex-col justify-items-center">
                                            <button
                                                className="flex flex-row place-items-center justify-center text-verysmall text-blue-100 border-dashed border-blue-100 border-2 bg-white w-full rounded-20 py-[5px] px-[20px] mt-[5px] hover:bg-blue-100 hover:text-white"
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Click or Drop here
                                            </button>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image.data_url} alt="" width="200" />
                                                    <div className="image-item__btn-wrapper">
                                                        <button className="flex flex-row place-items-center justify-center text-verysmall text-blue-100 border-dashed border-blue-100 border-2 bg-white w-full rounded-20 py-[5px] px-[20px] mt-[5px] hover:bg-blue-100 hover:text-white" onClick={() => onImageUpdate(index)}>Update</button>
                                                        <button className="flex flex-row place-items-center justify-center text-verysmall text-blue-100 border-dashed border-blue-100 border-2 bg-white w-full rounded-20 py-[5px] px-[20px] mt-[5px] hover:bg-blue-100 hover:text-white" onClick={() => onImageRemove(index)}>Remove</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                                <p className="font-roboto text-blue-100 text-verysmall font-thin mt-4">Enter prepartion time</p>
                                <Input label="Prepartion time" type="Number" onChangeInput={onChangePrepartionTime} />
                            </div>

                            <div>
                                <p className="font-roboto text-blue-100 text-verysmall font-thin">Nutritional values</p>
                                <NutritionalRow name="Total calories" value={addedPosition.length > 0 ? Math.round((addedPosition.reduce((a, v) => a = a + v.calories, 0)) * 100) / 100 : 0} unit="kcal" />
                                <NutritionalRow name="Protein" value={addedPosition.length > 0 ? Math.round((addedPosition.reduce((a, v) => a = a + v.protien, 0)) * 100) / 100 : 0} unit="g" />
                                <NutritionalRow name="Fat" value={addedPosition.length > 0 ? Math.round((addedPosition.reduce((a, v) => a = a + v.fat, 0)) * 100) / 100 : 0} unit="g" />
                                <NutritionalRow name="Carbohydrate" value={addedPosition.length > 0 ? Math.round((addedPosition.reduce((a, v) => a = a + v.carbohydrate, 0)) * 100) / 100 : 0} unit="g" />
                                <NutritionalRow name="Sugar" value={addedPosition.length > 0 ? Math.round((addedPosition.reduce((a, v) => a = a + v.sugars, 0)) * 100) / 100 : 0} unit="g" />

                            </div>

                        </div>
                        <div className="flex flex-col w-3/5  px-[10px]">
                            <p className="font-roboto text-blue-100 text-verysmall font-thin">Enter the name of the meal</p>
                            <Input label="Name of meal" type="text" onChangeInput={onChangeNameOfMeal} />
                            <p className="font-roboto text-blue-100 text-verysmall font-thin mt-[25px]">Meal ingredients</p>
                            <div className="w-full max-h-[200px] overflow-auto flex flex-col items-center">
                                {addedPosition.map(position => (
                                    <AddedPosition name={position.name} calories={position.calories} size={position.size} onClick={() => onRemoveElement(position.name)} />
                                ))
                                }
                            </div>
                            <button type="button" class="flex flex-row place-items-center justify-center text-blue-100 border-dashed border-blue-100 border-2 bg-white w-3/5 rounded-20 py-[5px] px-[20px] mt-[25px] hover:bg-blue-100 hover:text-white"
                                onClick={() => setShowModal(true)}>
                                <p className="font-roboto  text-verysmall font-semibold mr-2">Add new position</p>
                                <img className="w-[16px]" src={AddCircle} alt="" />
                            </button>
                            <p className="font-roboto text-blue-100 text-verysmall font-thin mt-[25px]">Enter recipe</p>
                            <textarea
                                id="recipeTextArea"
                                placeholder="Recipe"
                                className="w-full h-[120px] whitespace-normal rounded-10 text-verysmall border-1 mt-1 border-blue-10 shadow-sm 
                            focus:outline-none focus:border-blue-100 focus:ring-1 focus:ring-blue-100 text-blue-100 "
                                onChange={(e) => setRecipe(e.target.value)} />
                        </div>
                        <div className="flex  flex-col w-1/5 px-[10px]">
                            <div>
                                <p className="font-roboto text-blue-100 text-verysmall font-thin">Filters</p>
                                <CheckBoxGroup title="Type of meal" data={typesOfMeal} toggleDate={(e) => toggleDate(e, typesOfMeal, "typesOfMeal")} />
                                <CheckBoxGroup title="Limits" data={limits} toggleDate={(e) => toggleDate(e, limits, "limits")} />
                                <CheckBoxGroup title="Difficulty level" data={difficultyLevel} toggleDate={(e) => toggleDate(e, difficultyLevel, "difficultyLevel")} />
                            </div>
                            <button type="button" class="flex flex-row text-white place-items-center justify-center bg-blue-100 rounded-20 py-[5px] px-[20px] mt-[25px] hover:bg-blue-50 hover:text-blue-100"
                                onClick={handleSave}>
                                <p className="font-roboto  text-base font-normal mr-2">SAVE</p>
                                <img className="w-[24px]" src={Save} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative w-[600px] my-6 ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rounded-20">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        Choose ingredients to meal
                                    </h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-blue-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-white text-blue-100  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>

                                <div className="flex flex-row justify-items-center w-full ml-[25px] mt-[25px]">
                                    <Search onChangeSearch={onChangeSearch} />
                                    <button type="button" class="flex flex-row place-items-center justify-center bg-blue-100 text-white drop-shadow-basic w-2/12 rounded-20 hover:bg-blue-50 hover:text-white ml-[20px]"
                                        onClick={handleSearch}>
                                        <p className="font-roboto  text-base font-normal ml-6">Search</p>
                                        <img className="w-[24px] mr-2" src={Search} alt="" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-6 mt-[15px] justify-center p-[25px]">
                                    {ingredients.map(ingredient => (
                                        <button className="drop-shadow-basic p-[15px] bg-white rounded-15 hover:bg-blue-10" onClick={() => setIngredientSelected(ingredient)}>
                                            <p className="font-roboto text-blue-100 text-small font-semibold ">{ingredient.name}</p>
                                            <p className="font-roboto text-blue-100 text-small font-thin mt-2">{ingredient.calories + " kcal / " + ingredient.size + " g"}</p>
                                        </button>
                                        // <IngredientComonent ingredient={ingredient} />
                                    ))}
                                </div>


                                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                    <div className="flex flex-col">
                                        <p className="font-roboto text-blue-100 text-verysmall font-thin ml-2">Selected ingredients</p>
                                        <div className="flex w-[150px] justify-center drop-shadow-basic p-[10px] bg-white rounded-15 ">
                                            <p className="font-roboto text-blue-100 text-small font-semibold">{ingredientSelected.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-roboto text-blue-100 text-verysmall font-thin ml-2">Specify portion size [g]</p>
                                        <Input label="Specify portion size" type="Number" onChangeInput={onChangeIngredientSize} />
                                    </div>
                                    {/* <div className="flex flex-col">
                                        <p className="font-roboto text-blue-100 text-verysmall font-thin ml-2">Total calories </p>
                                        <div className="flex w-[150px] justify-center drop-shadow-basic p-[10px] bg-white rounded-15">
                                            <p className="font-roboto text-blue-100 text-small font-semibold">{ingredientCalories}</p>
                                        </div>
                                    </div> */}

                                    <button type="button" class="flex flex-row text-white place-items-center justify-center bg-blue-100 rounded-15 py-[5px] px-[20px] hover:bg-blue-50 hover:text-blue-100 mt-4"
                                        onClick={handleSaveIngredient}>
                                        <p className="font-roboto  text-base font-normal mr-2">SAVE</p>
                                        <img className="w-[24px]" src={Save} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>,
        document.getElementById("portal-root")
    )
}

export default AddMealPopUp;
