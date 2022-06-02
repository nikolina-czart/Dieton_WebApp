const Input = ({ label, type, onChangeInput }) => {
    return (
        <label class="blox">
            <input
                type={type}
                placeholder={label}
                onChange={onChangeInput}
                className="w-full h-full whitespace-normal rounded-10 text-verysmall border-1 mt-1 border-blue-10 shadow-sm 
                            focus:outline-none focus:border-blue-100 focus:ring-1 focus:ring-blue-100 text-blue-100 " />
        </label>
    )
};

export default Input;