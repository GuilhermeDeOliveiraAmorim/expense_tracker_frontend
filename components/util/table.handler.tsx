import Delete from "../actions/delete";
import { Category } from "@/internal/domain/category";
import { deleteCategory } from "../query_functions/qf.categoy";
import { deleteTag } from "../query_functions/qf.tag";
import { Tag } from "@/internal/domain/tag";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { isDarkColor } from "./color.handler";
import { Expense } from "@/internal/domain/expense";
import { deleteExpense } from "../query_functions/qf.expense";

export const columnsCategories: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge
        variant="outline"
        style={{
          backgroundColor: row.original.color,
          color: isDarkColor(row.original.color) ? "#ffffff" : "#000000",
        }}
      >
        {row.getValue("name")}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("created_at")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Delete
          entity_id={row.original.id}
          mutationKey={"delete-category"}
          mutationFn={deleteCategory}
          queryName="get-categories"
          entityIdKey="category_id"
        />
      );
    },
  },
];

export const columnsTags: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge
        variant="outline"
        style={{
          backgroundColor: row.original.color,
          color: isDarkColor(row.original.color) ? "#ffffff" : "#000000",
        }}
      >
        {row.getValue("name")}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("created_at")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Delete
          entity_id={row.original.id}
          mutationKey={"delete-tag"}
          mutationFn={deleteTag}
          queryName="get-tags"
          entityIdKey="tag_id"
        />
      );
    },
  },
];

export const columnsExpenses: ColumnDef<Expense>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.getValue("amount"));

      return <div className="font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Notes
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("notes")}</div>,
  },
  {
    accessorKey: "expense_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("expense_date")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Delete
          entity_id={row.original.id}
          mutationKey={"delete-expense"}
          mutationFn={deleteExpense}
          queryName={"get-expenses"}
          entityIdKey="expense_id"
        />
      );
    },
  },
];
