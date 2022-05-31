import React from "react";

const ItemNavbar = ({ path, icon, title }) => (
    <a href={path} className="group flex flex-col place-items-center w-[48px] h-[48px] mx-[10px]">
        <img className="w-[24px] mb-2 group-hover:fill-yellow" src={icon} alt="" />
        <p className="font-roboto text-blue-100 text-iconNavbar font-bold group-hover:text-yellow">{title}</p>
    </a>
)

export default ItemNavbar;