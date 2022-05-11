import React, { useState } from "react";
import Navbar from "../Navbar/Navbar"
import icon from "../../img/icon.svg"
import facebookIcon from "../../img/Facebook.svg"
import googleIcon from "../../img/Google.svg"
import twitterIcon from "../../img/Twitter.svg"
import personIcon from "../../img/Person.svg"
import emailIcon from "../../img/Email.svg"
import passwordIcon from "../../img/Password.svg"
import { NavLink } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../configs/firebaseConfig";
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { getErrorMessage } from "../../utils/ErrorUtils";
import { ToastContainer, toast } from 'react-toastify';
import { isEmpty, validateEmail, matchPassword } from "../../utils/ValidateUtils";

const Register = () => {
    let history = useHistory();

    const auth = getAuth();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const createNewUser = (uid) => {
        try {
            const docRef = setDoc(doc(db, "users", uid), {
                name: name,
                email: email
            });
            console.log("Document written with ID: ", docRef.id);
            toast.success("Super! You have registered correctly! :)")
        } catch (error) {
            toast.error("We have a problem registering you :(");
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (!isEmpty(name, "Please enter your name")
            && !isEmpty(email, "Please enter your e-mail")
            && !isEmpty(password, "Please enter your password")
            && validateEmail(email)
            && matchPassword(password, repeatPassword)) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    createNewUser(user.uid)
                    history.push("/parameters");
                })
                .catch((error) => {
                    toast.error(getErrorMessage(error.code))
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error ocured: ", errorCode, errorMessage);
                });
        }


    };


    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center p-[50px]">
                <div className="flex self-center w-[1000px] h-[580px] bg-white drop-shadow-basic rounded-20 ">
                    <div className="flex w-[500px] h-[580px] bg-blue-80 rounded-l-20 drop-shadow-none">
                        <div className="flex flex-col">
                            <div className="w-[120px] h-[120px] rounded-full bg-white mt-[60px] ml-[440px] flex place-content-center">
                                <img className="w-auto  " src={icon} alt="" />
                            </div>
                            <div className="w-0 h-0 border-b-white border-b-[290px] border-r-transparent  border-l-transparent border-l-[100px] mt-[110px] ml-[400px]"></div>
                        </div>

                        <div className="absolute w-[340px] h-[200px] text-white font-roboto text-center mt-[188px] ml-[80px]">
                            <h1 className="text-xl font-medium">Welcome Back!</h1>
                            <h1 className="text-lg font-normal mt-[25px]">To keep connected with us please login with your personaal info</h1>
                            <button className="w-[200px] h-[40px] drop-shadow-basic mt-[50px] ml-[68px] flex items-center rounded-15 border-[1px] hover:bg-blue-100 hover:border-none">
                                <NavLink to="/login">
                                    <p className="ml-[72px]">SIGN IN</p>
                                </NavLink>
                            </button>
                        </div>

                    </div>

                    <div className="w-[400px] h-[420px] bg-white ml-[50px] mt-[80px]">
                        <h1 className="font-roboto text-center text-blue-100 text-create font-semibold">Create Account</h1>
                        <div className="flex justify-center mt-30px">
                            <div className="w-[48px] h-[48px] bg-white drop-shadow-basic rounded-tl-15 rounded-br-15 flex place-content-center"><img className="w-[24px]" src={facebookIcon} alt="" /></div>
                            <div className="w-[48px] h-[48px] bg-white drop-shadow-basic rounded-tl-15 rounded-br-15 ml-[25px] flex place-content-center"><img className="w-[24px]" src={googleIcon} alt="" /></div>
                            <div className="w-[48px] h-[48px] bg-white drop-shadow-basic rounded-tl-15 rounded-br-15 ml-[25px] flex place-content-center"><img className="w-[24px]" src={twitterIcon} alt="" /></div>
                        </div>

                        <h1 className="font-roboto text-center text-blue-100 text-small font-light mt-30px">or use your email for registration:</h1>
                        <form className="mt-[15px]">
                            <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15">
                                <div className="flex justify-items-start">
                                    <img className="w-[24px] ml-[15px]" src={personIcon} alt="" />
                                </div>
                                <input
                                    type="text"
                                    className="ml-[15px] font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[15px]">
                                <div className="flex justify-items-start">
                                    <img className="w-[24px] ml-[15px]" src={emailIcon} alt="" />
                                </div>
                                <input
                                    type="email"
                                    className="ml-[15px] font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[15px]">
                                <div className="flex justify-items-start">
                                    <img className="w-[24px] ml-[15px]" src={passwordIcon} alt="" />
                                </div>
                                <input
                                    type="password"
                                    className="ml-[15px] font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[15px]">
                                <div className="flex justify-items-start">
                                    <img className="w-[24px] ml-[15px]" src={passwordIcon} alt="" />
                                </div>
                                <input
                                    type="password"
                                    className="ml-[15px] font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                    placeholder="Repeat password"
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                />
                            </div>
                            <button className="w-[200px] h-[40px] drop-shadow-basic mt-[30px] ml-[110px] flex items-center rounded-15 bg-blue-100 hover:bg-blue-60 hover:text-bg-blue-100" onClick={handleRegister} >
                                <p className="ml-[72px] text-white font-roboto font-medium">SIGN UP</p>
                            </button>
                        </form>
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
        </div>
    );
};

export default Register;