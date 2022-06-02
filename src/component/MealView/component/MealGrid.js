import React, { useEffect, useState } from "react";
import { db } from "../../../configs/firebase";
import { where, query, collection, getDocs } from "firebase/firestore";
import Search from "../../../img/Search.svg"

const MealGrid = () => {
    const [meals, setMeals] = useState([])
    const [search, setSearch] = useState("")
    const [isSearch, setIsSearch] = useState(false)

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const first = query(collection(db, "meals"));
        getDocs(first).then(({ docs }) => {
            const tempMeals = docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                time: doc.data().time,
                totalCalories: doc.data().totalCalories,
                protein: doc.data().protein,
                fat: doc.data().fat,
                carbohydrate: doc.data().carbohydrate,
                sugars: doc.data().sugars,
                recipe: doc.data().recipe,
                typesOfMeal: doc.data().typesOfMeal,
                limits: doc.data().limits,
                difficultyLevel: doc.data().difficultyLevel,
                imgURL: doc.data().imgURL,
                ingredients: doc.data().ingredients,
                user: doc.data().user
            }))


            setMeals(tempMeals)
        });
        // try {
        //     const first = query(collection(db, "meals"));
        //     const documentSnapshots = getDocs(first);

        //     let tempMeals = [];



        //     documentSnapshots.forEach((doc) => {
        //         tempMeals.push({
        //             id: doc.id,
        //             name: doc.data().name,
        //             time: doc.data().time,
        //             totalCalories: doc.data().totalCalories,
        //             protein: doc.data().protein,
        //             fat: doc.data().fat,
        //             carbohydrate: doc.data().carbohydrate,
        //             sugars: doc.data().sugars,
        //             recipe: doc.data().recipe,
        //             typesOfMeal: doc.data().typesOfMeal,
        //             limits: doc.data().limits,
        //             difficultyLevel: doc.data().difficultyLevel,
        //             imgURL: doc.data().imgURL,
        //             ingredients: doc.data().ingredients,
        //             user: doc.data().user,
        //         });
        //     });
        //     setMeals(tempMeals)
        // } catch (e) {
        //     console.log(e);
        // }
    }, []);

    const handleSearch = async () => {
        setIsSearch(true)
        if (search) {
            try {
                const first = query(collection(db, "meals"), where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
                const documentSnapshots = await getDocs(first);

                let tempMeals = [];

                documentSnapshots.forEach((doc) => {
                    tempMeals.push({
                        id: doc.id,
                        name: doc.data().name,
                        time: doc.data().time,
                        totalCalories: doc.data().totalCalories,
                        protein: doc.data().protein,
                        fat: doc.data().fat,
                        carbohydrate: doc.data().carbohydrate,
                        sugars: doc.data().sugars,
                        recipe: doc.data().recipe,
                        typesOfMeal: doc.data().typesOfMeal,
                        limits: doc.data().limits,
                        difficultyLevel: doc.data().difficultyLevel,
                        imgURL: doc.data().imgURL,
                        ingredients: doc.data().ingredients,
                        user: doc.data().user,
                    });
                });
                setMeals(tempMeals)
                return { meals: meals };
            } catch (e) {
                console.log(e);
            }

        } else {
            setIsSearch(false)
        }

    }

    console.log()

    return (
        <>
            <div className="grid grid-cols-4 gap-6 mt-[15px] justify-center">
                {meals.map(meal => (
                    <>
                        <p>{meal.name}</p>
                        <img
                            src={meal.imgURL}
                            alt="new"
                        />
                    </>


                ))}
            </div>
        </>
    )
}

export default MealGrid;