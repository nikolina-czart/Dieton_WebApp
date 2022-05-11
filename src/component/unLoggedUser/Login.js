import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import icon from "../../img/icon.svg"
import facebookIcon from "../../img/Facebook.svg"
import googleIcon from "../../img/Google.svg"
import twitterIcon from "../../img/Twitter.svg"
import emailIcon from "../../img/Email.svg"
import passwordIcon from "../../img/Password.svg"
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getErrorMessage } from "../../utils/ErrorUtils";
import { isEmpty, validateEmail } from "../../utils/ValidateUtils";


const Login = () => {
    const auth = getAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = (e) => {
        e.preventDefault();

        if (!isEmpty(email, "Please enter your e-mail") && !isEmpty(password, "Please enter your password") && validateEmail(email)) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    toast.success("Welcome back! Correct login!")
                    console.log("Singed in user: ", user);
                })
                .catch((error) => {
                    toast.error(getErrorMessage(error.code))
                });
        }

    };

    return (
        <div className="">
            <div className="">
                <Navbar />
                <div className="flex flex-col justify-center p-[50px]">
                    <div className="flex self-center justify-end w-[1000px] h-[580px] bg-white drop-shadow-basic rounded-20">

                        <div className="w-[400px] h-[420px] bg-white mr-[50px] mt-[80px]">
                            <h1 className="font-roboto text-center text-blue-100 text-create font-semibold">Sign in to Dieton</h1>
                            <div className="flex justify-center mt-30px">
                                <div className="w-[48px] h-[48px] bg-white drop-shadow-basic rounded-tl-15 rounded-br-15 flex place-content-center"><img className="w-[24px]" src={facebookIcon} alt="" /></div>
                                <div className="w-[48px] h-[48px] bg-white drop-shadow-basic rounded-tl-15 rounded-br-15 ml-[25px] flex place-content-center"><img className="w-[24px]" src={googleIcon} alt="" /></div>
                                <div className="w-[48px] h-[48px] bg-white drop-shadow-basic rounded-tl-15 rounded-br-15 ml-[25px] flex place-content-center"><img className="w-[24px]" src={twitterIcon} alt="" /></div>
                            </div>

                            <h1 className="font-roboto text-center text-blue-100 text-small font-light mt-30px">or use your email account:</h1>
                            <form className="mt-[15px]">
                                <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[15px]">
                                    <div className="flex justify-items-start">
                                        <img className="w-[24px] ml-[15px]" src={emailIcon} alt="" />
                                    </div>
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="ml-[15px] font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="flex flex-wrap w-full h-[30px] bg-blue-10 rounded-15 mt-[15px]">
                                    <div className="flex justify-items-start">
                                        <img className="w-[24px] ml-[15px]" src={passwordIcon} alt="" />
                                    </div>
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="ml-[15px] font-light flex-1 border-0 text-blue-60 self-center font-roboto text-small outline-none bg-transparent"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="mt-[30px] ml-[115px] w-[170px] bg-white border-b-2 border-blue-60">
                                    <NavLink to="/forgotpassword">
                                        <p className="text-center text-blue-80 text-small font-roboto font-normal">Forgot your password?</p>
                                    </NavLink>
                                </div>

                                <button className="self-end w-[200px] h-[40px] drop-shadow-basic mt-[30px] ml-[100px] flex items-center rounded-15 bg-blue-100 hover:bg-blue-60 hover:text-bg-blue-100" onClick={handleLogin}>
                                    <p className="ml-[72px] text-white font-roboto font-medium">SIGN IN</p>
                                </button>
                            </form>
                        </div>

                        <div className="flex w-[500px] h-[580px] bg-blue-80 rounded-r-20  drop-shadow-none">
                            <div className="flex flex-col">
                                <div className="w-[120px] h-[120px] rounded-full bg-white mt-[60px] -ml-[60px] flex place-content-center">
                                    <img className="w-auto  " src={icon} alt="" />
                                </div>
                                <div className="w-0 h-0 border-b-white border-b-[290px] border-l-transparent  border-r-transparent border-r-[100px] mt-[110px]"></div>
                            </div>

                            <div className="absolute w-[340px] h-[200px] text-white font-roboto text-center mt-[188px] ml-[80px]">
                                <h1 className="text-xl font-medium">Hello, Friend!</h1>
                                <h1 className="text-lg font-normal mt-[25px]">Enter your personal details</h1>
                                <h1 className="text-lg font-normal ">and start journey with us</h1>
                                <button className="w-[200px] h-[40px] drop-shadow-basic mt-[50px] ml-[68px] flex items-center rounded-15 border-[1px] hover:bg-blue-100 hover:border-none">
                                    <NavLink to="/signup">
                                        <p className="ml-[72px]">SIGN UP</p>
                                    </NavLink>
                                </button>
                            </div>
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
        </div>
    );
};

export default Login;