import "reflect-metadata";
import { DataSource } from "typeorm";
import { user } from "../models/user.model.js";

export const Connection = new DataSource({
  type: "sqlite",
  database: "ownAI.db",
  synchronize: true,
  entities: [user],
});
