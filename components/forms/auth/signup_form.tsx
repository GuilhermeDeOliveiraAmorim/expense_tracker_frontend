import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Understand your finances.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name here" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Email</Label>
              <Input id="email" placeholder="Your email here" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Register</Button>
      </CardFooter>
    </Card>
  );
}
