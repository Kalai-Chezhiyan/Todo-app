import { Navigate, useNavigate } from "react-router-dom";
import { Apple, Cancel, Eye, FaceBook, Google } from "../../assets/Assets";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-5 py-8 font-serif flex-col justify-between">
      <div>
        <div className="flex justify-between">
          <div className="text-4xl"> Create Account 👋</div>
          <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-lg">
            <Cancel />
          </div>
        </div>
        <div className="text-16 text-gray-500 py-4 ">
          Please register on our Streamline,Where you can continue using our
          service.
        </div>
        <div className="">
          <div className="w-full pt-7">
            <Input
              name="user name"
              type="text"
              placeholder="User Name"
              required={true}
            />
          </div>{" "}
          <div className="w-full pt-8">
            <Input
              name="email"
              type="email"
              placeholder="email@gmail.com"
              required={true}
            />
          </div>{" "}
          <div className="flex pt-8  relative ">
            <Input
              name="password"
              type="Password"
              placeholder="Password"
              required={true}
            />
            <div className="py-3 absolute right-3 top-[40%] ">
              <Eye />
            </div>
          </div>
          <div className="pt-8">
            <Button label="CONTINUE" type="submit" />
          </div>
        </div>
        <div className="my-5 flex items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-3 shrink text-sm text-gray-500">Or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-between">
          <div className="border-2 border-black rounded-2xl w-30 h-15 flex items-center justify-center ">
            <Google />
          </div>
          <div className="border-2 border-black rounded-2xl w-30 h-15 flex items-center justify-center">
            <Apple />
          </div>
          <div className="border-2 border-black rounded-2xl w-30 h-15 flex items-center justify-center">
            <FaceBook />
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex justify-center py-7">
          <div className=" font-bold"> Already have an account? </div>
          <div
            className="text-red-400 underline"
            onClick={() => navigate("/SignIn")}
          >
            sign in instead
          </div>
        </div>
      </div>
    </div>
  );
}
