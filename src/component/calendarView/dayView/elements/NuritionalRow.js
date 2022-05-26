import checkGood from "../../../../img/checkGood.svg"

const NutririonalRow = ({ title, value, maxValue, jednostka }) => {

    function isValueNutririonalCorrect() {
        const persentOfMaxValue = 0.1 * maxValue;
        if (value <= maxValue + persentOfMaxValue && value >= maxValue - persentOfMaxValue) {
            console.log(value)
            console.log(maxValue + persentOfMaxValue)
            return true
        } else {
            return false
        }
    }

    return (
        <div className="flex w-full bg-white drop-shadow-basic rounded-[15px] p-[10px] mb-[10px]">
            <div className="flex w-2/3 pr-[5px]">
                <div className="w-full p-[5px]">
                    <p className="font-roboto text-blue-100 text-small font-normal mb-4">{title}</p>
                    <div className="flex flex-row">
                        <p className="font-roboto text-blue-80 text-small font-extralight mr-2">Dietary assumptions:</p>
                        <p className="font-roboto text-blue-100 text-small font-extrabold mr-2"> {maxValue}</p>
                        <p className="font-roboto text-blue-100 text-small font-extrabold"> {jednostka}</p>
                    </div>

                </div>
            </div>
            {isValueNutririonalCorrect() ?
                <div className="flex w-1/3 p-[5px] ">
                    <div className="flex flex-row justify-end items-center w-full bg-green-100 p-[5px] rounded-[10px]">
                        <p className="font-roboto text-blue-100 text-small font-bold">{value + " "}</p>
                        <p className="font-roboto text-blue-100 text-small font-normal">{"/ " + maxValue}</p>
                        <img className="w-[48px]" src={checkGood} alt="" />
                    </div>
                </div>
                :
                <div className="flex w-1/3 pl-[5px]">
                    <div className="flex flex-row justify-end items-center w-full bg-red-100 p-[5px] rounded-[10px]">
                        <p className="font-roboto text-blue-100 text-small font-bold">{value + " "}</p>
                        <p className="font-roboto text-blue-100 text-small font-normal">{"/ " + maxValue}</p>
                        <img className="w-[48px]" src={checkGood} alt="" />
                    </div>
                </div>
            }
            {/* <div className="flex justify-center w-2/12 bg-blue-100 drop-shadow-basic rounded-tl-[15px] rounded-br-[15px]">
                <p className="font-roboto w-2/12 text-white text-small font-light mb-[20px]">{calories} </p>
            </div>
            <div className="flex ml-[5px] w-9/12 ">
                <p className="font-roboto  text-blue-100 text-small font-light mb-[20px]">{name} </p>
            </div>
            <button className="flex justify-center w-1/12">
                <img className="w-[24px]" src={close} alt="" />
            </button> */}

        </div>
    );
}

export default NutririonalRow;