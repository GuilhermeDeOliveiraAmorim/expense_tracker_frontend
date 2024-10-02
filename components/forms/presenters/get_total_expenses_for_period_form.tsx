import { getTotalExpensesForPeriod } from "@/components/query_functions/qf.presenters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatDateDdMmYyyy, rangerDate } from "@/components/util/date.handler";
import { useToast } from "@/hooks/use-toast";
import {
  GetTotalExpensesForPeriodInputDTO,
  GetTotalExpensesForPeriodOutputDTO,
} from "@/internal/presenters/get_total_expenses_for_period";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function GetTotalExpensesForPeriodForm() {
  const { toast } = useToast();

  const [startDate, setStartDate] = useState(
    rangerDate({
      last90Days: true,
    })
  );
  const [endDate, setEndDate] = useState(
    rangerDate({
      today: true,
    })
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoadingAmount, setIsLoadingAmount] = useState(false);

  const {
    data: getTotalExpensesForPeriodData,
    error: getTotalExpensesForPeriodError,
    isLoading: getTotalExpensesForPeriodLoading,
  } = useQuery({
    queryKey: [
      "get-total-expenses-for-period",
      "get-total-expenses-for-period",
    ],
    queryFn: () =>
      getTotalExpensesForPeriod({ startDate: startDate, endDate: endDate }),
  });

  useEffect(() => {
    if (!getTotalExpensesForPeriodLoading) {
      if (getTotalExpensesForPeriodData != undefined) {
        setTotalAmount(getTotalExpensesForPeriodData?.total);
      } else {
        setTotalAmount(0);
      }
    }
  }, [getTotalExpensesForPeriodData, getTotalExpensesForPeriodLoading]);

  const mutation = useMutation<
    GetTotalExpensesForPeriodOutputDTO,
    Error,
    GetTotalExpensesForPeriodInputDTO
  >({
    mutationKey: ["update-category"],
    mutationFn: getTotalExpensesForPeriod,
    onSuccess: (output: GetTotalExpensesForPeriodOutputDTO) => {
      setTotalAmount(output.total);
    },
    onError: () => setTotalAmount(0),
  });

  if (getTotalExpensesForPeriodError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch total amount",
      duration: 2500,
    });
    return;
  }

  const handleChangeDates = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);

    const input: GetTotalExpensesForPeriodInputDTO = {
      startDate: startDate,
      endDate: endDate,
    };

    setIsLoadingAmount(true);

    const delay = setTimeout(() => {
      mutation.mutate(input);
      setIsLoadingAmount(false);
    }, 300);

    return () => clearTimeout(delay);
  };

  if (getTotalExpensesForPeriodLoading) {
    return (
      <div>
        <Skeleton className="w-[350px] h-[200px] rounded-full" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between w-full items-center content-center pb-2">
        <CardTitle className="text-sm">Total Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between w-full items-baseline">
          {totalAmount == 0 ? (
            <div>No expenses found</div>
          ) : (
            <div className="flex flex-col justify-between w-full items-baseline">
              {isLoadingAmount ? (
                <div className="pt-[10px] pb-[10px]">
                  <Icons.spinner className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col w-full h-full text-3xl font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalAmount)}
                </div>
              )}
            </div>
          )}
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
                    rangerDate({
                      last7Days: true,
                    }),
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
                    rangerDate({
                      last30Days: true,
                    }),
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
                    rangerDate({
                      last90Days: true,
                    }),
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
        </div>
      </CardContent>
    </Card>
  );
}
