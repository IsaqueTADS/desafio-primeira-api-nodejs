import fastifyApiReference from "@scalar/fastify-api-reference";
import fastify from "fastify";
import { StringFormatParams } from "zod/v4/core";

declare module "fastify" {
  export interface FastifyRequest {
    user?: {
      sub: String;
      role: "student" | "manager";
    };
  }
}
