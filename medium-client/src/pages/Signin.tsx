import { useNavigate } from "react-router-dom";
import LabeledInputs from "../components/LabeledInputs";
import { Button } from "../components/Button1";
import { signinInputs } from "@nitishbakshi/medium-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Signin = () => {
  const [postInputs, setPostInputs] = useState<signinInputs>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendSiginReq = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
    } catch (error) {
      console.log(error);
      alert("error in signin(request failed buddy!)");
    }
  };

  return (
    <div className="w-full h-screen flex ">
      <div className="w-[50%] h-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl font-bold">Login </h1>
        <div className="flex text-[#6C6F7B] font-medium">
          <h2 className="text-grey">Don't have an account?</h2>
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className="underline ml-1 "
          >
            Signup
          </span>
        </div>
        <div className="w-full flex  flex-col items-center">
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

          <Button onCLickFn={sendSiginReq} text={"Signin"}></Button>
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

export default Signin;
