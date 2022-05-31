import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
    <p className="flex mt-[1px]">
        <label>
            <input
                type="checkbox"
                name={label}
                checked={isSelected}
                onChange={onCheckboxChange}
                className="form-check-input appearance-none h-4 w-4
                 border-blue-100 border-2 rounded-lg 
                 focus:border-blue-100 bg-white checked:bg-blue-100 checked:border-blue-100
                  focus:outline-none"
            />
            <span className="pl-2 text-small font-thin text-blue-100">{label}</span>
        </label>
    </p>
);

export default Checkbox;

