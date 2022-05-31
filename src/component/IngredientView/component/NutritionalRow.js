


const NutritionalRow = ({ name, value, unit }) => (
    <div className="flex w-full bg-white drop-shadow-basic rounded-[15px] my-[4px]">
        <div className="flex ml-[5px] w-8/12 p-[5px]">
            <p className="font-roboto  text-blue-100 text-small font-light">{name} </p>
        </div>
        <div className="flex place-items-center justify-center w-4/12 bg-blue-100 drop-shadow-basic rounded-tl-[15px] rounded-br-[15px]">
            <p className="font-roboto text-white text-small font-light mr-1">{value} </p>
            <p className="font-roboto text-white text-small font-light">g</p>
        </div>
    </div>

);


export default NutritionalRow;