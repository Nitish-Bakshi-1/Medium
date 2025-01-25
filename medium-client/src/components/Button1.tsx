interface ButtonTypes {
  text: string;
  onCLickFn: any;
}
export const Button: React.FC<ButtonTypes> = ({ text, onCLickFn }) => {
  return (
    <button
      onClick={onCLickFn}
      className="bg-[#18191B] w-[50%] px-4 py-2 rounded-md mt-2 text-white"
    >
      {text}
    </button>
  );
};
