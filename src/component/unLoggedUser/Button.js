import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Button = ({ style, navigate, text }) => {
    let history = useHistory();

    const handleButton = () => {
        history.push(navigate);
    };

    return (
        <button className="place-content-center w-[300px] h-[50px] drop-shadow-basic rounded-15 bg-blue-100 hover:bg-blue-60 hover:text-bg-blue-100" onClick={handleButton} >
            <p className="text-white font-roboto font-medium">{text}</p>
        </button>
    );
}

export default Button;