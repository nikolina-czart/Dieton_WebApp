import React from "react";
import Navbar from "../Navbar/Navbar"
import Button from "./Button";

const StartPage = () => (
  <>
    <Navbar />
    <div className="flex justify-center items-stretch p-[50px]">
      {/* nie mogę wyśrodkować! */}
      <div className="w-[1000px] h-[580px] bg-white drop-shadow-basic rounded-20 p-[50px]">
        <h1 className="font-roboto text-center text-blue-100 text-create font-semibold">Program for creating diets and menus</h1>
        <p className="font-roboto text-justify text-blue-100 text-base font-light px-[50px] py-[30px]">DietOn is a convenient diet program. It is designed for everyone: private users or dietitians. It contains everything that is necessary in the daily control of calorie intake, on any device with Internet access. It is an easy to use diet planner with an extensive database of products and dishes. DietOn is a new programme, but it doesn't differ from commercial programmes offering similar functions! Thanks to it, planning a diet has never been so easy. Today choose the best program to control your diet, currently for free!</p>
        <div className="flex justify-between px-[50px] mt-[30px]">
          <Button
            style={""}
            navigate={"/login"}
            text={"Come back to us"}
          />
          <Button
            style={""}
            navigate={"/signup"}
            text={"Try for free"}
          />
        </div>
      </div>


    </div>
  </>
);

export default StartPage;
