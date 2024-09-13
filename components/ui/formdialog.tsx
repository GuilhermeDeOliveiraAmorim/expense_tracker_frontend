import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";

type FormDialogProps = {
  form: JSX.Element;
};

export default function FormDialog(props: FormDialogProps) {
  const { form } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">+</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="fixed bg-white justify-center border-none left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        {form}
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
