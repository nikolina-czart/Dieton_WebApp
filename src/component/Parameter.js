import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../configs/firebaseConfig";

const Parameter = () => {
    let history = useHistory();

    const auth = getAuth();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [gender, setGender] = useState("woman");
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(180);
    const [weight, setWight] = useState(80);
    const [activity, setActivity] = useState(1);
    const [dietObject, setDietObject] = useState("1");

    const [BMR, setBMR] = useState(0)
    const [TMR, setTMR] = useState(0)
    const [calorie, setCalorie] = useState(0)

    const [result, setResults] = useState(false);


    const calculateBMR = () => {
        let W, H, A, X
        switch (gender) {
            case "woman":
                W = 9.247
                H = 3.098
                A = 4.330
                X = 447.593
                break;

            case "man":
                W = 13.397
                H = 4.799
                A = 5.677
                X = 88.362
                break;

            default:
                break;
        }
        return Math.round(W * weight + H * height - A * age + X)
    }


    const calculateTMR = () => {
        let activityValue = null
        switch (activity) {
            case 1:
                activityValue = 1.2
                break;
            case 2:
                activityValue = 1.3
                break;
            case 3:
                activityValue = 1.4
                break;
            case 4:
                activityValue = 1.5
                break;
            case 5:
                activityValue = 1.75
                break;
            case 6:
                activityValue = 2.0
                break;
            case 7:
                activityValue = 2.2
                break;
            case 8:
                activityValue = 2.4
                break;
            default:
                break;
        }
        return activityValue * calculateBMR()
    }

    const calculateCalories = () => {
        let caloricCorrection = null
        switch (dietObject) {
            case "1":
                caloricCorrection = -300
                break;
            case "2":
                caloricCorrection = 0
                break;
            case "3":
                caloricCorrection = 300
                break;
            default:
                break;
        }
        return calculateTMR() + caloricCorrection
    }

    const addParameterUser = (uid) => {
        const current = new Date();
        const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;

        const parameter = {
            gender: gender,
            age: age,
            height: height,
            weight: weight,
            activityLevel: activity,
            dietObject: dietObject,
            basalMetabolicRate: BMR,
            totalMetabolicRate: TMR,
            calorie: calorie
        }

        try {
            console.log(date)
            const parametersRef = doc(collection(db, "parameters"));
            const docRef = doc(db, "users", uid, "parameters", date);
            setDoc(docRef, parameter);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleCalculate = (e) => {
        e.preventDefault();

        setBMR(calculateBMR())
        setTMR(calculateTMR())
        setCalorie(calculateCalories())

        setResults(true)
    }

    const handleSave = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                addParameterUser(user.uid)
                // console.log(uid)
            } else {
                // User is signed out
            }
        })



        history.push("/");
    }


    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center">
                <div className="flex self-center w-[1000px] bg-white drop-shadow-basic rounded-20 mt-30px mb-[50px]">
                    <div className="w-full  bg-white ml-[50px] mt-[50px] mr-[50px] mb-[25px]">
                        <h1 className="font-roboto text-lg text-center text-blue-100 text-calculator font-semibold">PPM and CPM Calculator</h1>
                        <h1 className="font-roboto text-blue-100 text-small font-light mt-30px">Here you can easily calculate your calorie requirements. Just fill in the form below and correctly enter your gender, age, height, weight, physical activity level and diet goal. Based on your information we will choose the right diet for you.</h1>
                        <form className="mt-[30px]">
                            <div className="flex flex-row">
                                <div className="w-[385px] bg-white ml-[25px]">
                                    <div className="">
                                        <label htmlFor="gender" className="block mb-[2px] text-sm font-light text-blue-100">Gender</label>
                                        <select id="gender" defaultValue="woman" className="bg-blue-10 rounded-15 text-blue-100 text-sm w-full pl-2 h-[30px]" onChange={(e) => setGender(e.target.value)}>
                                            <option value="woman" >Woman</option>
                                            <option value="man">Man</option>
                                        </select>
                                    </div>
                                    <label htmlFor="countries" className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Height [cm]</label>
                                    <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[2px] ">
                                        <input
                                            type="Number"
                                            className="pl-8 font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                            defaultValue={180}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-[385px] bg-white ml-[80px]">
                                    <div className="">
                                        <label htmlFor="countries" className="block mb-[2px] text-sm font-light text-blue-100">Age</label>
                                        <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[2px] ">
                                            <input
                                                type="Number"
                                                className="pl-8 font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                                defaultValue={30}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="countries" className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Current body weight [kg]</label>
                                    <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[2px] ">
                                        <input
                                            type="Number"
                                            className="pl-8 font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                            defaultValue={80}
                                            onChange={(e) => setWight(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mr-[25px] ml-[25px]">
                                <label htmlFor="countries" className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Activity Level (PAL)</label>
                                <select id="countries" defaultValue={"Patient lying in bed, very low activity"} className="bg-blue-10 rounded-15 text-blue-100 text-sm w-full pl-2 h-[30px]" onChange={(e) => setActivity(e.target.value)}>
                                    <option value={1}>Patient lying in bed, very low activity</option>
                                    <option value={2}>Sedentary job, minimal activity during the day</option>
                                    <option value={3}>Sedentary job, medium activity, light exercise 3 times a week</option>
                                    <option value={4}>Lots of movement during the day, light training</option>
                                    <option value={5}>Lots of movement during the day, heavy, regular training</option>
                                    <option value={6}>Physical work, lots of movement after work</option>
                                    <option value={7}>Physical work, light training</option>
                                    <option value={8}>Physical work, heavy workouts</option>
                                </select>
                            </div>

                            <div className="mr-[25px] ml-[25px]">
                                <label htmlFor="countries" className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Objective of the diet</label>
                                <select id="countries" defaultValue={"Weight reduction"} className="bg-blue-10 rounded-15 text-blue-100 text-sm w-full pl-2 h-[30px]" onChange={(e) => setDietObject(e.target.value)}>
                                    <option value={"1"}>Weight reduction</option>
                                    <option value={"2"}>Weight maintenancey</option>
                                    <option value={"3"}>Weight gain</option>
                                </select>
                            </div>

                            <button className="w-[200px] h-[40px] drop-shadow-basic mt-[30px] ml-[25px] flex items-center rounded-15 bg-blue-100 hover:bg-blue-60 hover:text-bg-blue-100" onClick={(e) => handleCalculate(e)}>
                                <p className="ml-[60px] text-white font-roboto font-medium">Recalculate</p>
                            </button>
                        </form>
                    </div>

                </div>

                {result &&
                    <div className="flex self-center w-[1000px] bg-white drop-shadow-basic rounded-20 mb-[50px]">
                        <div className="w-full bg-white ml-[50px] mt-[50px] mr-[50px] mb-[25px]">
                            <h1 className="font-roboto text-lg text-center text-blue-100 text-calculator font-semibold">Harris-Benedict formula results</h1>
                            <p className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Your Basal Metabolic Rate (BMR):</p>
                            <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[2px] ">
                                <p class="pl-8 font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                >{BMR}</p>
                            </div>
                            <p className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Basal Metabolic Rate (BMR) is the amount of calories your body needs to maintain basic life functions such as organ function and temperature. It is the lower calorie limit of a diet below which you should not go.</p>
                            <p className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Your Total Metabolic Rate (TMR):</p>
                            <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[2px] ">
                                <p class="pl-8 font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                >{TMR}</p>
                            </div>
                            <p className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Total Caloric Metabolism (TCM) is the average amount of calories your body requires for activity throughout the day. CPM includes PPM and your workout and non-workout activity. It is important to determine your physical activity accordingly.</p>
                            <h1 className="font-roboto text-lg text-center text-blue-100 text-calculator font-semibold mt-[30px]">Suggested diet</h1>
                            <p className="block mb-[2px] text-sm font-light text-blue-100 mt-[15px]">Your calorie requirements are:</p>
                            <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[2px] ">
                                <p class="pl-8 font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                >{calorie}</p>
                            </div>
                            <button className="w-[200px] h-[40px] drop-shadow-basic mt-[30px] ml-[25px] flex items-center rounded-15 bg-blue-100 hover:bg-blue-60 hover:text-bg-blue-100" onClick={(e) => handleSave(e)}>
                                <p className="ml-[60px] text-white font-roboto font-medium">Save</p>
                            </button>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Parameter;