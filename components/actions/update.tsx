"use client";

import FormDialog from "../ui/formdialog";
import { Icons } from "@/components/ui/icons";

type UpdateProps = {
  ariaDescribedby: string;
  form: JSX.Element;
};

export default function Update({ ariaDescribedby, form }: UpdateProps) {
  return (
    <FormDialog
      icon={<Icons.settings className="w-4 cursor-pointer" />}
      ariaDescribedby={ariaDescribedby}
      form={form}
    />
  );
}
