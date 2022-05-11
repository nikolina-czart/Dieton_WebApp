import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import icon from "../img/icon.svg"
import facebookIcon from "../img/Facebook.svg"
import googleIcon from "../img/Google.svg"
import twitterIcon from "../img/Twitter.svg"
import personIcon from "../img/Person.svg"
import emailIcon from "../img/Email.svg"
import passwordIcon from "../img/Password.svg"
import { NavLink } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../configs/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../redux/slice/authSlice";
import MonthView from "./Calendar/calendarMonth/MonthView";

const Dashboard = () => {
  const auth = getAuth();
  const user = useSelector((state) => state.auth.value);
  console.log("user from state", user);

  return (
    <div>
      <Navbar />
      <div className="px-[140px] mt-[50px]">
        <MonthView />
      </div>

    </div>
  )
}

export default Dashboard;