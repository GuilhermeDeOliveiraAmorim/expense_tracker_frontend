import { Icons } from "./icons";

export function IconSpinner() {
  return (
    <div className="pt-[10px] pb-[10px] w-full flex h-full justify-center items-center">
      <Icons.spinner className="w-4 h-4 animate-spin" />
    </div>
  );
}
