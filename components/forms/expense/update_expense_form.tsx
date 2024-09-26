"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { MultiSelect } from "@/components/ui/multipleselector";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Category } from "@/internal/domain/category";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/components/query_functions/qf.categoy";
import { getTags } from "@/components/query_functions/qf.tag";
import { updateExpense } from "@/components/query_functions/qf.expense";
import { displayNotification } from "@/components/util/notification.handler";
import {
  UpdateExpenseOutputDTO,
  UpdateExpenseInputDTO,
} from "@/internal/usecases/update_expense";
import { Expense } from "@/internal/domain/expense";

type UpdateExpenseFormProps = {
  expense: Expense;
};

export default function UpdateExpenseForm({ expense }: UpdateExpenseFormProps) {
  const expenseTreated = {
    amountTreated: Number(expense.amount).toFixed(2),
    dateTreated: expense.expense_date,
    notesTreated: expense.notes,
    categoryIdTreated: expense.category_id,
    tagsTreated:
      expense.tags !== null && expense.tags.length > 0
        ? expense.tags.map((tag) => tag.id)
        : [],
  };

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [amount, setAmount] = useState(expenseTreated.amountTreated);
  const [date, setDate] = useState<Date>(expenseTreated.dateTreated);
  const [notes, setNotes] = useState(expenseTreated.notesTreated);
  const [categoryId, setCategoryId] = useState(
    expenseTreated.categoryIdTreated
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    expenseTreated.tagsTreated
  );

  const [categories, setCategory] = useState<Category[]>([]);
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["get-categories", "get-categories"],
    queryFn: () => getCategories({}),
  });

  const {
    data: tagsData,
    error: tagsError,
    isLoading: tagsLoading,
  } = useQuery({
    queryKey: ["get-tags", "get-tags"],
    queryFn: () => getTags({}),
  });

  useEffect(() => {
    if (!categoriesLoading && !tagsLoading) {
      if (
        categoriesData != undefined &&
        tagsData != undefined &&
        tagsData.tags !== null
      ) {
        setCategory(categoriesData?.categories);
        setTags(
          tagsData?.tags.map((tag) => ({ label: tag.name, value: tag.id }))
        );
      } else {
        setCategory([]);
        setTags([]);
      }
    }
  }, [
    categoriesData,
    categoriesData?.categories,
    categoriesLoading,
    tagsData,
    tagsData?.tags,
    tagsLoading,
  ]);

  const mutation = useMutation<
    UpdateExpenseOutputDTO,
    Error,
    UpdateExpenseInputDTO
  >({
    mutationKey: ["update-expense"],
    mutationFn: updateExpense,
    onSuccess: (output: UpdateExpenseOutputDTO) =>
      displayNotification({
        outputType: {
          success: output,
        },
        variantToast: "default",
        durationToast: 2500,
        styleToast: {
          backgroundColor: "#4ade80",
        },
        queryClient: queryClient,
        queryKey: {
          query: "get-expenses",
          key: "get-expenses",
        },
      }),
    onError: (error: Error) =>
      displayNotification({
        outputType: {
          error: error,
        },
        durationToast: 2500,
        variantToast: "destructive",
      }),
  });

  if (categoriesError || tagsError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch categories and tags",
      duration: 2500,
    });
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !date || !categoryId) {
      toast({
        variant: "destructive",
        title: "All fields are required",
        description: "Please fill in all the fields.",
        duration: 2500,
      });
      return;
    }

    const expense_id = expense.id;
    const category_id = categoryId;
    const expense_date = format(date, "ddMMyyyy");

    mutation.mutate({
      expense_id,
      amount,
      category_id,
      expense_date,
      notes,
      tags: selectedTags,
    });

    setAmount(amount);
    setNotes(notes);
    setDate(date);
    setCategoryId(category_id);
    setSelectedTags(selectedTags);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="amount"
                type="number"
                placeholder="Your amount here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-label="Amount"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild aria-label="Expense Date">
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
                  onSelect={(day) => day && setDate(day)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex gap-4">
              {categoriesLoading ? (
                <Skeleton className="w-full rounded-md" />
              ) : (
                <Select
                  name="category"
                  key={categoryId}
                  onValueChange={(value) => setCategoryId(value)}
                  value={categoryId}
                  aria-label="Category listing"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories?.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
              )}
            </div>
            <div className="flex gap-4">
              {tagsLoading ? (
                <Skeleton className="w-full rounded-md" />
              ) : (
                <MultiSelect
                  options={tags || []}
                  onValueChange={(selectedValues) =>
                    setSelectedTags(selectedValues)
                  }
                  defaultValue={selectedTags}
                  placeholder="Select tags"
                  variant="inverted"
                  maxCount={3}
                  aria-label="Tag listing"
                />
              )}
            </div>
            <div className="flex gap-4 items-end">
              <Textarea
                name="notes"
                id="notes"
                value={notes}
                placeholder="Type your note here"
                onChange={(e) => setNotes(e.target.value)}
                aria-label="Notes"
              />
              <Button type="submit">
                <Icons.save className="w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
