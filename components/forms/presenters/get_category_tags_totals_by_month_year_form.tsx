import { getCategoryTagsTotalsByMonthYear } from "@/components/query_functions/qf.presenters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DateSelector from "@/components/ui/dateselector";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { MonthOption } from "@/internal/presenters/get_available_months_years";
import {
  CategoryTagsTotals,
  GetCategoryTagsTotalsByMonthYearInputDTO,
  GetCategoryTagsTotalsByMonthYearOutputDTO,
} from "@/internal/presenters/get_category_tags_totals_by_month_year";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type GetCategoryTagsTotalsByMonthYearFormProps = {
  availableYears: number[];
  availableMonths: MonthOption[];
};

export default function GetCategoryTagsTotalsByMonthYearForm({
  availableMonths,
  availableYears,
}: GetCategoryTagsTotalsByMonthYearFormProps) {
  const [month, setMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryTagsTotals, setCategoryTagsTotals] =
    useState<CategoryTagsTotals>();
  const [isLoadingcategoryTagsTotalsData, setIsLoadingcategoryTagsTotalsData] =
    useState(false);

  const {
    data: categoryTagsTotalsData,
    error: categoryTagsTotalsError,
    isLoading: categoryTagsTotalsLoading,
  } = useQuery({
    queryKey: ["category-tags-totals"],
    queryFn: () =>
      getCategoryTagsTotalsByMonthYear({
        month: selectedMonth,
        year: selectedYear,
      }),
  });

  useEffect(() => {
    if (categoryTagsTotalsData && categoryTagsTotalsData.expenses) {
      setCategoryTagsTotals(categoryTagsTotalsData.expenses);
      setMonth(categoryTagsTotalsData.expenses.month);
      setYear(categoryTagsTotalsData.expenses.year);
      setTotalAmount(categoryTagsTotalsData.expenses.total);
    } else {
      setCategoryTagsTotals(undefined);
      setMonth((new Date().getMonth() + 1).toString().padStart(2, "0"));
      setYear(new Date().getFullYear());
      setTotalAmount(0);
    }
  }, [categoryTagsTotalsData, categoryTagsTotalsLoading]);

  const mutation = useMutation<
    GetCategoryTagsTotalsByMonthYearOutputDTO,
    Error,
    GetCategoryTagsTotalsByMonthYearInputDTO
  >({
    mutationKey: ["total-expenses-for-current-month"],
    mutationFn: getCategoryTagsTotalsByMonthYear,
    onSuccess: (output: GetCategoryTagsTotalsByMonthYearOutputDTO) => {
      setCategoryTagsTotals(output.expenses);
      setMonth(output.expenses.month);
      setYear(output.expenses.year);
      setTotalAmount(output.expenses.total);
    },
    onError: () => setCategoryTagsTotals(undefined),
  });

  const handleChangeDate = () => {
    if (availableYears.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No available years to select.",
        duration: 2500,
      });
      return;
    }

    if (selectedMonth && selectedYear) {
      setIsLoadingcategoryTagsTotalsData(true);

      const delay = setTimeout(() => {
        mutation.mutate({
          month: selectedMonth,
          year: selectedYear,
        });
        setIsLoadingcategoryTagsTotalsData(false);
      }, 300);

      return () => clearTimeout(delay);
    }
  };

  if (categoryTagsTotalsError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by month",
      duration: 2500,
    });
    return;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col w-full pb-4">
        <div className="flex flex-row justify-between gap-4">
          <div>
            <CardTitle className="text-sm">
              Total by tags and category
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {month}, {year}, R$ {totalAmount.toFixed(2).replace(".", ",")}
            </CardDescription>
          </div>
          <DateSelector
            year={{
              onYearChange: (value) => setSelectedYear(Number(value)),
              selectedYear: selectedYear,
              years: availableYears,
            }}
            month={{
              onMonthChange: (value) => setSelectedMonth(value),
              selectedMonth: selectedMonth,
              months: availableMonths,
            }}
            onRefresh={() => handleChangeDate()}
          />
        </div>
      </CardHeader>
      <CardContent>
        {!isLoadingcategoryTagsTotalsData ? (
          categoryTagsTotals?.categories &&
          categoryTagsTotals.categories.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {categoryTagsTotals.categories.map((category, index) => (
                <AccordionItem key={category.name} value={`item-${index}`}>
                  <AccordionTrigger className="flex justify-between gap-4">
                    <div className="w-full flex justify-between">
                      <span>{category.name}</span>
                      <span>R$ {category.total.toFixed(2)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="mt-2 space-y-1">
                      {category.tags.map((tag) => (
                        <li key={tag.name} className="flex justify-between">
                          <span className="text-gray-700">{tag.name}</span>
                          <span className="text-gray-600">
                            R$ {tag.total.toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="pt-[10px] pb-[10px] w-full flex h-full justify-center items-center text-[#e5e7eb]">
              <Icons.fileX2 />
            </div>
          )
        ) : (
          <div className="pt-[10px] pb-[10px] w-full flex h-full justify-center items-center">
            <Icons.spinner className="w-4 h-4 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
