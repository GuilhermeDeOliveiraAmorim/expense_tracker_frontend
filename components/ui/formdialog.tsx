import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";

type FormDialogProps = {
  ariaDescribedby: string;
  form: JSX.Element;
};

export default function FormDialog({ ariaDescribedby, form }: FormDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">+</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-fit fixed shadow-none bg-white justify-center border-none left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        {form}
        <AlertDialogCancel className="bg-[#171717] text-white border-none hover:bg-primary/90 hover:text-white">
          Back
        </AlertDialogCancel>
      </AlertDialogContent>
      <AlertDialogDescription aria-describedby={ariaDescribedby} />
    </AlertDialog>
  );
}
