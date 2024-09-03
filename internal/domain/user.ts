export class User {
  id: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deactivated_at: Date;
  name: string;

  constructor(
    id: string,
    active: boolean,
    created_at: Date,
    updated_at: Date,
    deactivated_at: Date,
    name: string
  ) {
    this.id = id;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deactivated_at = deactivated_at;
    this.name = name;
  }
}
