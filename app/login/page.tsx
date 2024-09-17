import LoginForm from "@/components/forms/auth/login_form";
import AuthLogo from "@/components/logo/authlogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Insight | Login",
  description: "Login to your account on Expense Insight",
};

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-black">
        <AuthLogo />
      </div>
      <div className="w-1/2 bg-white">
        <LoginForm />
      </div>
    </div>
  );
}
