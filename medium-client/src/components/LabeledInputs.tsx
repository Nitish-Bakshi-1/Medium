import { ChangeEvent } from "react";

interface LabeledInputsTypes {
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInputs: React.FC<LabeledInputsTypes> = ({
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div className="flex flex-col  gap-2 m-3 w-[50%]">
      <label
        className="capitalize text-[#18191B] font-semibold text-md"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="border-[0.5px] border-[#6C6F7B] px-4 rounded-md py-2 outline-0 text-[#6C6F7B]"
        type="text"
      />
    </div>
  );
};

export default LabeledInputs;
