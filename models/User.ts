// models/User.ts
export type Role = "admin" | "seller" | "customer";

export type Permission =
  | "user:read"
  | "user:write"
  | "product:create"
  | "product:read"
  | "product:update"
  | "product:delete"
  | "order:read"
  | "order:refund";

export interface DbUser {
  _id: string;
  email: string;
  name?: string;
  image?: string;
  role: Role;                      // single role (simple)
  permissions?: Permission[];      // optional extra overrides
}
