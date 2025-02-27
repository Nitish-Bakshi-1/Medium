import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button1";
import LabeledInputs from "../components/LabeledInputs";
import { useState } from "react";
import { signupInputs } from "@nitishbakshi/medium-common";
import { BACKEND_URL } from "../config";
import axios from "axios";

const Signup = () => {
  const [postInputs, setPostInputs] = useState<signupInputs>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendSignupReq = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (error) {
      alert("error in signup(request failed buddy!)");
      console.log(error);
    }
  };

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
          <LabeledInputs
            onChange={(e) => {
              setPostInputs((postInputs) => ({
                ...postInputs,
                name: e.target.value,
              }));
            }}
            name="username"
            placeholder={"Enter your username"}
          />
          <LabeledInputs
            onChange={(e) => {
              setPostInputs((postInputs) => ({
                ...postInputs,
                email: e.target.value,
              }));
            }}
            name="email"
            placeholder="m@example.com"
          />
          <LabeledInputs
            onChange={(e) => {
              setPostInputs((postInputs) => ({
                ...postInputs,
                password: e.target.value,
              }));
            }}
            name="password"
            placeholder="******"
          />

          <Button onCLickFn={sendSignupReq} text={"Signup"}></Button>
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
