import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button1";
import LabeledInputs from "../components/LabeledInputs";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex ">
      <div className="w-[50%] h-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl font-bold">Create an account</h1>
        <div className="flex text-[#6C6F7B] font-medium">
          <h2 className="text-grey">Already have an account?</h2>
          <span
            onClick={() => {
              navigate("/signin");
            }}
            className="underline ml-1 "
          >
            Login
          </span>
        </div>
        <div className="w-full flex  flex-col items-center">
          <LabeledInputs name="username" placeholder={"Enter your username"} />
          <LabeledInputs name="email" placeholder="m@example.com" />
          <LabeledInputs name="password" placeholder="******" />

          <Button onCLickFn={() => {}} text={"Signup"}></Button>
        </div>
      </div>
      <div className="w-[50%] h-full bg-[#F3F4F6] text-[#18191B] flex flex-col justify-center items-center">
        <p className=" w-[70%] text-2xl font-bold">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </p>
        <p className="w-[70%] mt-4 font-extrabold">Jules Winnfield</p>
        <p className="w-[70%] text-[#6C6F7B]">CEO, .co</p>
      </div>
    </div>
  );
};

export default Signup;
