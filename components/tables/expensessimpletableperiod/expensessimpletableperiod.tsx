import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/datepickerwithrange";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    expense_id: "INV001",
    amount: "Paid",
    expense_date: "$250.00",
    category_name: "Credit Card",
    category_color: "Credit Card",
  },
  {
    expense_id: "INV001",
    amount: "Paid",
    expense_date: "$250.00",
    category_name: "Credit Card",
    category_color: "Credit Card",
  },
  {
    expense_id: "INV001",
    amount: "Paid",
    expense_date: "$250.00",
    category_name: "Credit Card",
    category_color: "Credit Card",
  },
  {
    expense_id: "INV001",
    amount: "Paid",
    expense_date: "$250.00",
    category_name: "Credit Card",
    category_color: "Credit Card",
  },
  {
    expense_id: "INV001",
    amount: "Paid",
    expense_date: "$250.00",
    category_name: "Credit Card",
    category_color: "Credit Card",
  },
  {
    expense_id: "INV001",
    amount: "Paid",
    expense_date: "$250.00",
    category_name: "Credit Card",
    category_color: "Credit Card",
  },
  {
    expense_id: "INV001",
    amount: "Paid",
    expense_date: "$250.00",
    category_name: "Credit Card",
    category_color: "Credit Card",
  },
];

export default function ExpenseSimpleTablePeriod() {
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-0 border-b p-0 sm:flex-row items-center pr-6">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>List of expenses by period</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <DatePickerWithRange />
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.expense_id}>
                <TableCell className="font-medium">
                  {invoice.category_name}
                </TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.expense_date}</TableCell>
                <TableCell className="text-right">
                  {invoice.category_color}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
