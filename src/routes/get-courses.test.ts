import { test, expect } from "vitest";
import { randomUUID } from "node:crypto";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeCourse } from "../factories/make-courses.ts";
import { makeAuthenticateUser } from "../factories/make-users.ts";

test("get course by id", async () => {
  await server.ready();

  const titleId = randomUUID();

  const { token } = await makeAuthenticateUser("manager");

  const course = await makeCourse(titleId);

  const response = await request(server.server)
    .get(`/courses?search=${titleId}`)
    .set("Authorization", token);
  console.log(response.body);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: 0,
      },
    ],
  });
});
