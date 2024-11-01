import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

export function CurrentMonthAmount() {
  return (
    <main className="grid grid-cols-4 gap-4 pl-36 pr-36 pt-12 bg-[EEF4ED]">
      <Card className="bg-[EEF4ED]">
        <CardHeader className="bg-[EEF4ED]">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </main>
  );
}
