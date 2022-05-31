const Input = ({ label, type, onChangeInput, value }) => {
    return (
        <label class="block">
            <input
                type={type}
                placeholder={label}
                onChange={onChangeInput}
                value={value}
                className="w-[60px] text-center rounded-15 text-iconNavbar border-1 mt-1 border-blue-10 shadow-sm 
                            focus:outline-none focus:border-blue-100 focus:ring-1 focus:ring-blue-100 text-blue-100 " />
        </label>
    )
};

export default Input;