export class Expense {
  id: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deactivated_at: Date;
  user_id: string;
  amount: number;
  expense_date: Date;
  category_id: string;
  notes: string;

  constructor(
    id: string,
    active: boolean,
    created_at: Date,
    updated_at: Date,
    deactivated_at: Date,
    user_id: string,
    amount: number,
    expense_date: Date,
    category_id: string,
    notes: string
  ) {
    this.id = id;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deactivated_at = deactivated_at;
    this.user_id = user_id;
    this.amount = amount;
    this.expense_date = expense_date;
    this.category_id = category_id;
    this.notes = notes;
  }
}
