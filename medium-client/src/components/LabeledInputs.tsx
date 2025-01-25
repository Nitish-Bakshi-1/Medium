interface LabeledInputsTypes {
  name: string;
  placeholder: string;
}
const LabeledInputs: React.FC<LabeledInputsTypes> = ({ name, placeholder }) => {
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
        placeholder={placeholder}
        className="border-[0.5px] border-[#6C6F7B] px-4 rounded-md py-2 outline-0 text-[#6C6F7B]"
        type="text"
      />
    </div>
  );
};

export default LabeledInputs;
