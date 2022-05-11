import React, { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DayComponent = ({ day, month, value, maxValue }) => {
    return (
        <>
            <div className="bg-white w-[140px] h-[140px] drop-shadow-basic rounded-20 p-[15px]">
                <p className="font-roboto text-right text-blue-100 text-small font-normal mb-[1px]">{day} {month}</p>

                <div className="w-full h-[95px] bg-white flex items-center justify-center">
                    <div className="w-[90px] h-[90px] place-self-center ">
                        <CircularProgressbar
                            value={value}
                            maxValue={maxValue}
                            text={`${value}/${maxValue}`} />
                    </div>
                </div>

            </div>
            {/* <div className="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">{day} {month}</div> */}
        </>

    );
}

export default DayComponent;