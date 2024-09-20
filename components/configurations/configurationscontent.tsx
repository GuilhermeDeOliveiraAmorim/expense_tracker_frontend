"use client";

import AddTagForm from "../forms/tag/add_tag_form";
import AddCategoryForm from "../forms/category/add_category_form";
import Delete from "../actions/delete";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContentProps } from "@/props_types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Category } from "@/internal/domain/category";
import { useQuery } from "@tanstack/react-query";
import { deleteCategory, getCategories } from "../query_functions/qf.categoy";
import { deleteTag, getTags } from "../query_functions/qf.tag";
import { Tag } from "@/internal/domain/tag";
import { Skeleton } from "../ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "../tables/expense/expensetable";
import { Badge } from "../ui/badge";
import { isDarkColor } from "../util/color.handler";

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
          user_id={row.original.user_id}
          entity_id={row.original.id}
          mutationKey={"delete-category"}
          mutationFn={deleteCategory}
          queryName="categories"
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
          user_id={row.original.user_id}
          entity_id={row.original.id}
          mutationKey={"delete-tag"}
          mutationFn={deleteTag}
          queryName="tags"
          entityIdKey="tag_id"
        />
      );
    },
  },
];

export default function ConfigurationsContent({
  header,
  footer,
}: PageContentProps) {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories", userId],
    queryFn: () => getCategories(input),
    enabled: !!userId,
  });

  const {
    data: tagsData,
    error: tagsError,
    isLoading: tagsLoading,
  } = useQuery({
    queryKey: ["tags", userId],
    queryFn: () => getTags(input),
    enabled: !!userId,
  });

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    const access_token = sessionStorage.getItem("access_token");

    if (
      access_token === null ||
      access_token === undefined ||
      user_id === null ||
      user_id === undefined ||
      access_token === "" ||
      access_token === "" ||
      user_id === "" ||
      user_id === ""
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated",
        action: <Icons.alert className="mr-2 h-4 w-4" />,
        duration: 2500,
      });

      router.push("/login");

      return;
    }

    setUserId(user_id);
    setIsLoading(false);
  }, [router]);

  const input: { user_id: string } = {
    user_id: userId,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

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
  let tags: Tag[] = [];

  if (tagsData?.tags === null || categoriesData?.categories === null) {
    categories = [];
    tags = [];
  } else {
    categories = categoriesData?.categories || [];
    tags = tagsData?.tags || [];
  }

  return (
    <>
      {header ? header : ""}

      <main className="flex flex-1 bg-gray-100 pl-48 pr-48 pt-6 pb-6 gap-6 w-full">
        <div className="flex flex-col gap-6">
          <AddCategoryForm user_id={userId} />
          <AddTagForm user_id={userId} />
        </div>
        <div className="flex gap-6 w-full">
          <div className="w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                {categoriesLoading ? (
                  <Skeleton className="w-full h-[20px] rounded-full" />
                ) : (
                  <DataTable
                    data={categories}
                    columns={columnsCategories}
                    filterColumnName="name"
                    filterPlaceholder="Filter by name"
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <div className="w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                {tagsLoading ? (
                  <Skeleton className="w-full h-[20px] rounded-full" />
                ) : (
                  <DataTable
                    data={tags}
                    columns={columnsTags}
                    filterColumnName="name"
                    filterPlaceholder="Filter by name"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {footer ? footer : ""}
    </>
  );
}
