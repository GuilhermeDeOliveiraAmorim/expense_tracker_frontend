import { Category } from "./category";
import { Tag } from "./tag";

export class Expense {
  id: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deactivated_at: Date;
  amount: number;
  expense_date: Date;
  category_id: string;
  notes: string;
  category: Category;
  tags: Tag[];

  constructor(
    id: string,
    active: boolean,
    created_at: Date,
    updated_at: Date,
    deactivated_at: Date,
    amount: number,
    expense_date: Date,
    category_id: string,
    notes: string,
    category: Category,
    tags: Tag[]
  ) {
    this.id = id;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deactivated_at = deactivated_at;
    this.amount = amount;
    this.expense_date = expense_date;
    this.category_id = category_id;
    this.notes = notes;
    this.category = category;
    this.tags = tags;
  }
}
