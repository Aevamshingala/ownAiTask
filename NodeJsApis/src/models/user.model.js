import { EntitySchema } from "typeorm";

export const user = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "text" },
    email: { type: "text", unique: true },
    password: { type: "text" },
    role: { type: "text", enum: ["user", "admin"], default: "user" },
    phone: { type: "text" },
    city: { type: "text" },
    country: { type: "text" },
  },
});
