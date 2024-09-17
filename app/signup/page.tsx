import SignupForm from "@/components/forms/auth/signup_form";
import AuthLogo from "@/components/logo/authlogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Sign Up",
  description: "Sign up for a new account on Expense Insight",
};

export default function Signup() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-black">
        <AuthLogo />
      </div>
      <div className="w-1/2 bg-white">
        <SignupForm />
      </div>
    </div>
  );
}
