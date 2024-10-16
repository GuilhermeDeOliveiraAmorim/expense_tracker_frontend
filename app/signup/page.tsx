import SignupForm from "@/components/forms/auth/signup_form";
import AuthLogo from "@/components/logo/authlogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Sign Up",
  description: "Sign up for a new account on Expense Insight",
};

export default function Signup() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="bg-black">
        <AuthLogo />
      </div>
      <div className="bg-white">
        <SignupForm />
      </div>
    </div>
  );
}
