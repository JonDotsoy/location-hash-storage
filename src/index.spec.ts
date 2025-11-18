import { describe, test, expect } from "bun:test";
import { LocationHashStorage } from "./index.js";

describe("LocationHashStorage", () => {
  test("should store and retrieve an item", () => {
    LocationHashStorage.setItem("test", "test");
    const value = LocationHashStorage.getItem("test");
    expect(value).toBe("test");
  });

  test("should remove an item and return undefined", () => {
    LocationHashStorage.setItem("test", "test");
    const value = LocationHashStorage.removeItem("test");
    expect(value).toBeUndefined();
  });
});
