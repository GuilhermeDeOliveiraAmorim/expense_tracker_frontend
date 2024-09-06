import LoginForm from "@/components/forms/auth/login_form";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-full">
        <div className="w-1/2 bg-login bg-cover flex items-center justify-center"></div>

        <div className="w-1/2 bg-white flex items-center justify-center">
          <h2 className="text-white text-2xl">
            <LoginForm />
          </h2>
        </div>
      </div>
    </div>
  );
}