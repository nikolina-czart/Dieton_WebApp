import React, { useEffect, useState } from "react";
import popupStyles from "./addingredient-popup.module.css";
import { createPortal } from "react-dom";
import Close from "../../../img/Close.svg"
import Save from "../../../img/Save.svg"
import Input from "./Input";
import { isEmpty, validateEmail } from "../../../utils/ValidateUtils";
import { collection, query, orderBy, startAfter, limit, getDocs, addDoc, where, setDoc, doc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../../../configs/firebase"
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { async } from "@firebase/util";

const AddIngredientPopUp = ({ isOpen, onClose }) => {
    let history = useHistory();

    const [calories, setCalories] = useState(0);
    const [carbohydrate, setCarbohydrate] = useState(0);
    const [fat, setFat] = useState(0);
    const [fiber, setFiber] = useState(0);
    const [protein, setProtein] = useState(0);
    const [size, setSize] = useState(0);
    const [sugars, setSugars] = useState(0);
    const [name, setName] = useState("");

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeCalories = (e) => {
        setCalories(e.target.value)
    }

    const onChangeCarbohydrate = (e) => {
        setCarbohydrate(e.target.value)
    }

    const onChangeFat = (e) => {
        setFat(e.target.value)
    }

    const onChangeFiber = (e) => {
        setFiber(e.target.value)
    }

    const onChangeProtein = (e) => {
        setProtein(e.target.value)
    }

    const onChangeSize = (e) => {
        setSize(e.target.value)
    }

    const onChangeSugars = (e) => {
        setSugars(e.target.value)
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (!isEmpty(name, "Please enter name ingredient")) {
            // const q = query(collection(db, "ingredients"), where("name", "==", "Carrot"));
            const first = query(collection(db, "ingredients"), where("name", "==", name));
            const documentSnapshots = await getDocs(first);

            console.log(documentSnapshots.size)

            documentSnapshots.forEach((doc) => {
                console.log(doc.data().name)
            });

            if (documentSnapshots.size === 0) {
                console.log("produkt")
                const docRef = addDoc(collection(db, "ingredients"), {
                    calories: calories,
                    carbohydrate: carbohydrate,
                    fat: fat,
                    fiber: fiber,
                    protein: protein,
                    size: size,
                    sugars: sugars,
                    name: name
                });
                toast.success("Saved product: " + name);
                onClose()
            } else {
                toast.error("The product with this name is in the database")
            }
        }
    }

    if (!isOpen) return null
    return createPortal(
        <>
            <div className="fixed top-0 left-0 right-0 h-full bg-black opacity-50"></div>
            <div className="grid place-items-center h-screen">
                <div className="flex flex-col w-[600px] bg-white drop-shadow-basic rounded-20 absolute top-1/4 p-[30px]">
                    <div className="w-full flex justify-end items-start">
                        <button onClick={onClose}>
                            <img className="w-[24px]" src={Close} alt="" />
                        </button>
                    </div>
                    <div className="flex flex-col justify-items-center">
                        <p className="font-roboto text-blue-100 text-lg font-semibold ">ADD NEW INGREDIENT</p>
                        <form>
                            <div className="flex flex-row">
                                <div className="w-1/2 pr-[10px]">
                                    <Input label="Ingredient name" onChangeInput={onChangeName} type="text" />
                                    <Input label="Calories" onChangeInput={onChangeCalories} type="Number" value={calories} />
                                    <Input label="Size" onChangeInput={onChangeSize} type="Number" value={size} />
                                    <Input label="Protein" onChangeInput={onChangeProtein} type="Number" value={protein} />
                                </div>
                                <div className="w-1/2 pl-[10px]">
                                    <Input label="Fat" onChangeInput={onChangeFat} type="Number" value={fat} />
                                    <Input label="Carbohydrate" onChangeInput={onChangeCarbohydrate} type="Number" value={carbohydrate} />
                                    <Input label="Sugars" onChangeInput={onChangeSugars} type="Number" value={sugars} />
                                    <Input label="Fiber" onChangeInput={onChangeFiber} type="Number" value={fiber} />
                                </div>
                            </div>
                        </form>
                        <button type="button" class="flex flex-row place-items-center justify-center bg-blue-100 w-3/12 rounded-20 py-[5px] px-[20px] mt-[25px]"
                            onClick={handleSave}>
                            <p className="font-roboto text-white text-base font-normal mr-2">SAVE</p>
                            <img className="w-[24px]" src={Save} alt="" />
                        </button>
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
        </>,
        document.getElementById("portal-root")
    )
}

export default AddIngredientPopUp;

{/* tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"> */ }
