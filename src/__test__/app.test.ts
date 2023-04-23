import { describe, test, expect } from "vitest";

const isDev = process.env.NODE_ENV === "development";

describe("general app tests", () => {
  test("server is running", () => {
    expect(InitializeApp()).toBe(
      "TodoApp - Listening on port " + process.env.PORT
    );
  });
});
