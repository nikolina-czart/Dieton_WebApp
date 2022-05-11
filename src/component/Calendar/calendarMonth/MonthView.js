import React, { useEffect, useState } from "react";
import { calendar } from "../../../utils/CalendarUtils";

const MonthView = () => {




    const handle = (e) => {
        console.log(calendar(new Date()))

    }


    return (
        <>
            <button className="self-end w-[200px] h-[40px] drop-shadow-basic mt-[30px] ml-[100px] flex items-center rounded-15 bg-blue-100 hover:bg-blue-60 hover:text-bg-blue-100" onClick={(e) => handle(e)}>
                <p className="ml-[72px] text-white font-roboto font-medium">SIGN IN</p>
            </button>

        </>

        // <div class="grid grid-cols-7 gap-4">
        //     {/* {monthData.map(item => (
        //     <DayComponent key={item.name} {...item} />
        // ))} */}

        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        //     <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
        // </div>
    );
}


export default MonthView;