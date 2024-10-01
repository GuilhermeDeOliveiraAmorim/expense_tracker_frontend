import { getMonthlyExpensesByCategoryPeriod } from "@/components/query_functions/qf.presenters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatDateDdMmYyyy, rangerDate } from "@/components/util/date.handler";
import { toast } from "@/hooks/use-toast";
import {
  GetMonthlyExpensesByCategoryPeriodInputDTO,
  GetMonthlyExpensesByCategoryPeriodOutputDTO,
  MonthlyCategoryExpense,
} from "@/internal/presenters/get_monthly_expenses_by_category_period";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function GetMonthlyExpensesByCategoryPeriodForm() {
  const [categories, setCategories] = useState<MonthlyCategoryExpense[]>([]);
  const [startDate, setStartDate] = useState(
    rangerDate({
      last1Year: true,
    })
  );
  const [endDate, setEndDate] = useState(
    rangerDate({
      today: true,
    })
  );

  const {
    data: monthlyExpensesByCategoryData,
    error: monthlyExpensesByCategoryError,
    isLoading: monthlyExpensesByCategoryLoading,
  } = useQuery({
    queryKey: ["monthly-expenses-by-category", "monthly-expenses-by-category"],
    queryFn: () =>
      getMonthlyExpensesByCategoryPeriod({
        startDate: startDate,
        endDate: endDate,
      }),
  });

  useEffect(() => {
    if (!monthlyExpensesByCategoryLoading) {
      if (
        monthlyExpensesByCategoryData &&
        monthlyExpensesByCategoryData.expenses
      ) {
        setCategories(monthlyExpensesByCategoryData?.expenses);
      } else {
        setCategories([]);
      }
    }
  }, [monthlyExpensesByCategoryData, monthlyExpensesByCategoryLoading]);

  const mutation = useMutation<
    GetMonthlyExpensesByCategoryPeriodOutputDTO,
    Error,
    GetMonthlyExpensesByCategoryPeriodInputDTO
  >({
    mutationKey: ["update-category"],
    mutationFn: getMonthlyExpensesByCategoryPeriod,
    onSuccess: (output: GetMonthlyExpensesByCategoryPeriodOutputDTO) => {
      setCategories(output?.expenses);
    },
    onError: () => setCategories([]),
  });

  const handleChangeDates = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);

    const input: GetMonthlyExpensesByCategoryPeriodInputDTO = {
      startDate: startDate,
      endDate: endDate,
    };

    mutation.mutate(input);
  };

  if (monthlyExpensesByCategoryError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch expenses by category",
      duration: 2500,
    });
    return;
  }

  console.log(categories);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between w-full items-center content-center pb-2">
        <CardTitle className="text-sm">Expenses by month</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between w-full items-baseline">
        {monthlyExpensesByCategoryData?.expenses.length === 0 ? (
          <div>No expenses found</div>
        ) : (
          <div className="flex flex-row justify-between w-full items-baseline">
            <p className="text-xs text-muted-foreground">
              {formatDateDdMmYyyy(startDate) +
                " - " +
                formatDateDdMmYyyy(endDate)}
            </p>

            <ToggleGroup type="single">
              <ToggleGroupItem
                onClick={() =>
                  handleChangeDates(
                    format(
                      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                      "ddMMyyyy"
                    ),
                    format(new Date(), "ddMMyyyy")
                  )
                }
                value="07"
                aria-label="07 days"
                className="text-sm text-gray-500 w-3 h-6"
              >
                07
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  handleChangeDates(
                    format(
                      new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
                      "ddMMyyyy"
                    ),
                    format(new Date(), "ddMMyyyy")
                  )
                }
                value="30"
                aria-label="30 days"
                className="text-sm text-gray-500 w-3 h-6"
              >
                30
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  handleChangeDates(
                    format(
                      new Date(new Date().getTime() - 90 * 24 * 60 * 60 * 1000),
                      "ddMMyyyy"
                    ),
                    format(new Date(), "ddMMyyyy")
                  )
                }
                value="90"
                aria-label="90 days"
                className="text-sm text-gray-500 w-3 h-6"
              >
                90
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
