import close from "../../../../img/Close.svg"

const MealRow = ({ calories, name }) => {

    return (
        <div className="flex w-full bg-white drop-shadow-basic rounded-[15px]">
            <div className="flex justify-center w-2/12 bg-blue-100 drop-shadow-basic rounded-tl-[15px] rounded-br-[15px]">
                <p className="font-roboto w-2/12 text-white text-small font-light mb-[20px]">{calories} </p>
            </div>
            <div className="flex ml-[5px] w-9/12 ">
                <p className="font-roboto  text-blue-100 text-small font-light mb-[20px]">{name} </p>
            </div>
            <button className="flex justify-center w-1/12">
                <img className="w-[24px]" src={close} alt="" />
            </button>

        </div>
    );
}

export default MealRow;