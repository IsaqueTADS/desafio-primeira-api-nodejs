import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeCourse } from "../factories/make-courses.ts";
import { makeAuthenticateUser } from "../factories/make-users.ts";

test("get course by id", async () => {
  await server.ready();

  const { token } = await makeAuthenticateUser("student");
  const course = await makeCourse();

  const response = await request(server.server)
    .get(`/courses/${course.id}`)
    .set("Authorization", token);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("return 404 for non existing courses", async () => {
  await server.ready();
  const { token } = await makeAuthenticateUser("student");

  const response = await request(server.server)
    .get(`/courses/01995f23-1986-7f37-98e6-ccbcc59adb85`)
    .set("Authorization", token);

  expect(response.status).toEqual(404);
});
