import LoginForm from "@/components/forms/auth/login_form";
import AuthLogo from "@/components/logo/authlogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Login",
  description: "Login to your account on Expense Insight",
};

export default function Login() {
  return (
    <div className="flex flex-col w-full h-screen lg:flex-row">
      <div className="bg-black lg:w-1/2">
        <AuthLogo />
      </div>
      <div className="bg-white lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
