"use client";

import AddTagForm from "../forms/tag/add_tag_form";
import AddCategoryForm from "../forms/category/add_category_form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContentProps } from "@/props_types/auth";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Category } from "@/internal/domain/category";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../query_functions/qf.categoy";
import { getTags } from "../query_functions/qf.tag";
import { Tag } from "@/internal/domain/tag";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

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
          <AddTagForm user_id={userId} />
          <AddCategoryForm user_id={userId} />
        </div>
        <div className="flex gap-6 w-full">
          <div className="w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Color</TableHead>
                    <TableHead className="text-right">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoriesLoading ? (
                    <Skeleton className="w-full h-[20px] rounded-full" />
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium w-full">
                          {category.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {category.active ? "Atctive" : "Inactive"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            style={{ backgroundColor: category.color }}
                          >
                            {category.color}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {String(category.created_at)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
          <div className="w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Color</TableHead>
                    <TableHead className="text-right">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tagsLoading ? (
                    <Skeleton className="w-full h-[20px] rounded-full" />
                  ) : (
                    tags.map((tag) => (
                      <TableRow key={tag.id}>
                        <TableCell className="font-medium w-full">
                          {tag.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {tag.active ? "Atctive" : "Inactive"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            style={{ backgroundColor: tag.color }}
                          >
                            {tag.color}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {String(tag.created_at)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </main>

      {footer ? footer : ""}
    </>
  );
}
