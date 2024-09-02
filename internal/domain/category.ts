export class Category {
  category_id: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deactivated_at: Date;
  name: string;
  color: string;

  constructor(
    category_id: string,
    active: boolean,
    created_at: Date,
    updated_at: Date,
    deactivated_at: Date,
    name: string,
    color: string
  ) {
    this.category_id = category_id;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deactivated_at = deactivated_at;
    this.name = name;
    this.color = color;
  }
}
