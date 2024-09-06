import SignupForm from "@/components/forms/auth/signup_form";

export default function Signup() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-full">
        <div className="w-1/2 bg-login bg-cover flex items-center justify-center"></div>

        <div className="w-1/2 bg-white flex flex-col items-center justify-center gap-4">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
