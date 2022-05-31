import Checkbox from "./CheckBox";

const CheckBoxGroup = ({ title, data, toggleDate }) => (
    <>
        <p className="font-roboto text-blue-100 text-small font-semibold mt-[15px]">{title}</p>
        <div className="pl-4 mt-1">
            {data.map((date) => (
                <Checkbox
                    key={date.id}
                    label={date.type}
                    isSelected={date.checked}
                    onCheckboxChange={toggleDate}
                />
            ))}
        </div>
    </>
);

export default CheckBoxGroup;

