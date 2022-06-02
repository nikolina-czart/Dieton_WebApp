import close from "../../../../img/Close.svg"
const AddedPosition = ({ name, calories, size, onClick }) => (

    <div className="flex items-center w-11/12 bg-white drop-shadow-basic rounded-[15px] my-1 p-2 divide-x">
        <div className="flex justify-center items-center w-3/12 rounded-l-[15px]">
            <p className="font-roboto h-full text-blue-100 text-small text-center font-light">{calories + " kcal"}</p>
        </div>
        <div className="flex justify-center items-center w-3/12">
            <p className="font-roboto h-full text-blue-100 text-small text-center font-light">{size + " g"}</p>
        </div>
        <div className="flex w-9/12 ">
            <p className="font-roboto  text-blue-100 text-small font-light ml-2">{name} </p>
        </div>
        <button className="flex justify-center w-1/12" name={name} onClick={onClick}>
            <img className="w-[16px]" src={close} alt="" />
        </button>

    </div>

);


export default AddedPosition;