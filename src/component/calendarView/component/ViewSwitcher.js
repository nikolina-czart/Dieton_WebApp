import React, { useState } from "react";

const ViewSwitcher = ({ selectedView, setView }) => {

    function buttonHandler(view) {
        setView(view)
    }

    return (
        <div className="w-[300px] h-[32px] bg-white drop-shadow-basic flex row items-center justify-between rounded-10 divide-x">
            <button className={selectedView === "month" ? "w-1/3 h-[32px] font-roboto rounded-l-10 bg-blue-100 text-white text-base font-semibold" : "w-1/3 h-[32px] font-roboto text-blue-100 text-base font-semibold hover:bg-blue-10 hover:text-bg-blue-100 rounded-l-10"}
                onClick={() => buttonHandler("month")}
            >Month</button>
            <button className={selectedView === "week" ? "w-1/3 h-[32px] font-roboto bg-blue-100 text-white text-base font-semibold rounded-tr-10 rounded-bl-10" : "w-1/3 h-[32px] font-roboto text-blue-100 text-base font-semibold hover:bg-blue-10 hover:text-bg-blue-100 rounded-tr-10 rounded-bl-10"}
                onClick={() => buttonHandler("week")}
            >Week</button>
            <button className={selectedView === "day" ? "w-1/3 h-[32px] font-roboto bg-blue-100 text-white text-base font-semibold rounded-r-10" : "w-1/3 h-[32px] font-roboto text-blue-100 text-base font-semibold hover:bg-blue-10 hover:text-bg-blue-100 rounded-r-10"}
                onClick={() => buttonHandler("day")}
            >Day</button>
        </div>
    )
}

export default ViewSwitcher;