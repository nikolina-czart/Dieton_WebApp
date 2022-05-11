import React, { useEffect, useState } from "react";

const Alert = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 w-full h-[30px] rounded-15 relative mt-[10px] text-center" role="alert">
    <strong className="font-bold">Error!</strong>
    <span className="block sm:inline ml-[5px]">{message}</span>
  </div>
);

export default Alert;