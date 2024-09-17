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
  CreateExpenseInputDTO,
  CreateExpenseOutputDTO,
} from "@/internal/usecases/create_expense";
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
import { useState } from "react";
import { Category } from "@/internal/domain/category";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/components/query_functions/qf.categoy";
import { getTags } from "@/components/query_functions/qf.tag";
import { AuthFormProps } from "@/props_types/auth";
import { createExpense } from "@/components/query_functions/qf.expense";
import { displayNotification } from "@/components/util/notification.handler";
import AddCategoryForm from "../category/add_category_form";
import AddTagForm from "../tag/add_tag_form";
import FormDialog from "@/components/ui/formdialog";

export default function AddExpenseForm({ user_id }: AuthFormProps) {
  const { toast } = useToast();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const mutation = useMutation<
    CreateExpenseOutputDTO,
    Error,
    CreateExpenseInputDTO
  >({
    mutationFn: createExpense,
    onSuccess: (output: CreateExpenseOutputDTO) =>
      displayNotification({
        outputType: {
          success: output,
        },
        variantToast: "default",
        durationToast: 2500,
        styleToast: {
          backgroundColor: "#4ade80",
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

  const input: { user_id: string } = {
    user_id: user_id,
  };

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories", user_id],
    queryFn: () => getCategories(input),
    enabled: !!user_id,
  });

  const {
    data: tagsData,
    error: tagsError,
    isLoading: tagsLoading,
  } = useQuery({
    queryKey: ["tags", user_id],
    queryFn: () => getTags(input),
    enabled: !!user_id,
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

  let categories: Category[] = [];
  let tags: { label: string; value: string }[] = [];

  if (tagsData?.tags === null || categoriesData?.categories === null) {
    categories = [];
    tags = [];
  } else {
    categories = categoriesData?.categories || [];
    tags =
      tagsData?.tags.map((tag) => ({ label: tag.name, value: tag.id })) || [];
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

    const category_id = categoryId;
    const expense_date = format(
      date instanceof Date ? date : new Date(),
      "ddMMyyyy"
    );
    const tags = selectedTags;

    mutation.mutate({
      amount,
      category_id,
      expense_date,
      notes,
      tags,
      user_id,
    });

    setAmount("");
    setDate(undefined);
    setNotes("");
    setCategoryId("");
    setSelectedTags([]);
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
                  onSelect={setDate}
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

              <FormDialog form={<AddCategoryForm user_id={user_id} />} />
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

              <FormDialog form={<AddTagForm user_id={user_id} />} />
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
