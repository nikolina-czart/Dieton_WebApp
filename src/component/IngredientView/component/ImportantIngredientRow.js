const ImportantIngredientRow = ({ title, img, value, unit }) => (
    <div className="flex flex-col">
        <p className="font-roboto text-center text-blue-100 text-verysmall font-think mb-[5px]">{title}</p>
        <div className="flex items-start bg-white rounded-[15px] py-[5px] px-[10px]">
            <img className="w-[24px] mr-2" src={img} alt="" />
            <p className="font-roboto text-center self-center text-blue-100 text-small font-normal">{value} {unit}</p>
        </div>
    </div>

);


export default ImportantIngredientRow;