import React, { useState } from "react";

const MealSwitcher = ({ selectedType, setType }) => {

    function buttonHandler(e) {
        setType(e)
    }

    return (
        <div className="w-[300px] h-[32px] bg-white drop-shadow-basic flex row items-center justify-between rounded-10 divide-x">
            <button className={selectedType === "all" ? "w-1/3 h-[32px] font-roboto rounded-l-10 bg-blue-100 text-white text-base font-semibold" : "w-1/3 h-[32px] font-roboto text-blue-100 text-base font-semibold hover:bg-blue-10 hover:text-bg-blue-100 rounded-l-10"}
                onClick={() => buttonHandler("all")}
            >All</button>
            <button className={selectedType === "own" ? "w-1/3 h-[32px] font-roboto bg-blue-100 text-white text-base font-semibold rounded-tr-10 rounded-bl-10" : "w-1/3 h-[32px] font-roboto text-blue-100 text-base font-semibold hover:bg-blue-10 hover:text-bg-blue-100 rounded-tr-10 rounded-bl-10"}
                onClick={() => buttonHandler("own")}
            >Own</button>
            <button className={selectedType === "favourite" ? "w-1/3 h-[32px] font-roboto bg-blue-100 text-white text-base font-semibold rounded-r-10" : "w-1/3 h-[32px] font-roboto text-blue-100 text-base font-semibold hover:bg-blue-10 hover:text-bg-blue-100 rounded-r-10"}
                onClick={() => buttonHandler("favourite")}
            >Favourite</button>
        </div>
    )
}

export default MealSwitcher;