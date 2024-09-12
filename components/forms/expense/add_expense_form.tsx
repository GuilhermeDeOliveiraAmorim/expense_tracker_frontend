"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Icons } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CategoryFactory } from "@/internal/factory/category.factory";
import { CreateExpenseInputDTO } from "@/internal/usecases/create_expense";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { GetCategoriesOutputDTO } from "@/internal/usecases/get_categories";
import { ExpenseFactory } from "@/internal/factory/expense.factory";
import { Category } from "@/internal/domain/category";
import MultipleSelector, { Option } from "@/components/ui/multipleselector";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "Vite", value: "vite", disable: true },
  { label: "Nuxt", value: "nuxt", disable: true },
  { label: "Vue", value: "vue, disable: true", disable: true },
  { label: "Remix", value: "remix" },
  { label: "Svelte", value: "svelte", disable: true },
  { label: "Angular", value: "angular", disable: true },
  { label: "Ember", value: "ember", disable: true },
  { label: "React", value: "react" },
  { label: "Gatsby", value: "gatsby", disable: true },
  { label: "Astro", value: "astro", disable: true },
];

export default function AddExpenseForm() {
  const { toast } = useToast();

  const [categories, setCategories] = useState<GetCategoriesOutputDTO>();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");

    if (user_id === null || user_id === undefined) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 1500,
      });
      return;
    }

    const fetchCategories = async () => {
      try {
        const categoryFactory = new CategoryFactory();
        const categories = await categoryFactory
          .getCategoriesUseCase()
          .execute({
            user_id: user_id,
          });

        if (categories.categories) {
          setCategories(categories);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
            action: <Icons.alert className="mr-2 h-4 w-4" />,
            duration: 1500,
          });
          return;
        } else {
          toast({
            variant: "default",
            title: "Error",
            description: "An unexpected error occurred",
            action: <Icons.alert className="mr-2 h-4 w-4" />,
            duration: 1500,
          });
          return;
        }
      }
    };

    fetchCategories();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !notes || !date || !categoryId) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all the fields.",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 1500,
      });
      return;
    }

    try {
      const user_id = sessionStorage.getItem("user_id");

      if (user_id === null || user_id === undefined) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User not authenticated",
          action: <Icons.alert className="mr-2 h-4 w-4" />,
          duration: 1500,
        });
        return;
      }

      const input: CreateExpenseInputDTO = {
        user_id: user_id,
        amount: amount,
        expense_date: format(date, "ddMMyyyy"),
        category_id: categoryId,
        notes: notes,
        tags: [
          "01J7KWKVYN14MQ0BZA3JB74ZQV",
          "01J7KWP6GG5Z7EPD0WEV50KK0V",
          "01J7KWSEM322CDBJVW5F2381VB",
        ],
      };

      const expenseFactory = new ExpenseFactory();
      const createExpenseUseCase = expenseFactory.createExpenseUseCase();

      const response = await createExpenseUseCase.execute(input);

      toast({
        variant: "default",
        title: "Success",
        description: response.message,
        style: {
          backgroundColor: "#4ade80",
        },
        action: <Icons.check className="mr-2 h-4 w-4" />,
        duration: 1500,
      });

      setAmount("");
      setDate(undefined);
      setNotes("");
      setCategoryId("");
      setCategories(categories);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
          action: <Icons.alert className="mr-2 h-4 w-4" />,
          duration: 1500,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred",
          action: <Icons.alert className="mr-2 h-4 w-4" />,
          duration: 1500,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Your amount here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select
              name="category"
              key={categoryId}
              onValueChange={(value) => setCategoryId(value)}
              value={categoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories?.categories.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: category.color,
                            borderRadius: "50%",
                            display: "inline-block",
                            margin: "0 4px",
                          }}
                        ></div>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <MultipleSelector
              defaultOptions={OPTIONS}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
            <Textarea
              name="notes"
              id="notes"
              value={notes}
              placeholder="Type your message here"
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Add</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
