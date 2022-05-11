import React, { useEffect, useState } from "react";
import logo from "../../img/logo.svg"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../../redux/slice/authSlice";
import calendarIcon from "../../img/calendar.svg"
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../../configs/firebaseConfig";
import { initializeApp } from "firebase/app";

const Navbar = () => {
    const auth = getAuth();
    const user = useSelector((state) => state.auth.value);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [name, setName] = useState("")
    const [actualUser, setActualUser] = useState()

    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(saveUser(user.refreshToken));

                getDoc(doc(db, "users", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                        setName(docSnap.data().name)
                        console.log("Document data:", docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                })

            } else {
                dispatch(saveUser(undefined));
            }
        });
    }, [auth, dispatch]);

    return (
        <nav className="flex items-center justify-between h-[70px] bg-white drop-shadow-basic rounded-br-40 px-[20px]">
            <div className=" w-1/3">
                <a href="/">
                    <img className="w-auto h-[40px] " src={logo} alt="" />
                </a>
            </div>

            {user &&
                <>
                    <div class="w-1/3 flex row justify-center">
                        <div className="w-[48px] h-[48px] flex place-content-center">
                            <img className="w-[24px]" src={calendarIcon} alt="" />
                            <p></p>
                        </div>
                    </div>
                    <div class="w-1/3 flex justify-end">
                        <div className="w-[40px] h-[40px] bg-blue-100 rounded-full flex justify-center items-center">
                            <p className="text-white font-roboto font-medium ">{name.charAt(0)}</p>
                        </div>
                    </div>
                </>
            }

        </nav>
    )
}

export default Navbar;