import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";
import { Database } from "../database.js";
import { buildRoutePath } from "../utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select("users", search ? {
        name: search,
        email: search
      }: null);

      return res.writeHead(200)
        .end(Buffer.from(JSON.stringify(users)));
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: async (req, res) => {
      const { name, email, password } = req.body;
      const hashPass = await hash(password, 6);

      const user = {
        id: randomUUID(),
        name: name,
        email: email,
        password: hashPass
      };
  
      database.insert("users", user);
  
      return res.writeHead(201).end(Buffer.from(JSON.stringify(user)));
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      database.delete("users", id);
      return res.writeHead(204).end();
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const hashedPass = await hash(password, 6);

      database.update("users", id,  { 
        name, 
        email,
        password: hashedPass
      });

      return res.writeHead(204).end();
    }
  }
]