import { describe, test, expect, mock } from "bun:test";
import { LocationHashStorage } from "./index.js";

const nextCicle = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2);
  });
};

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

  test("should subscribe to item changes and call callback on updates", async () => {
    LocationHashStorage.setItem("test", ""); // Reset value

    const fn = mock();

    const unsub = LocationHashStorage.subscribeItem(
      "test",
      (value: string | null) => {
        fn(value);
      },
    );

    await nextCicle();

    expect(unsub).toBeFunction();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith("");

    LocationHashStorage.setItem("test", "test");
    await nextCicle();
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith("test");
    LocationHashStorage.setItem("test", "test");
    await nextCicle();
    expect(fn).toBeCalledTimes(2);

    LocationHashStorage.setItem("test", "test2");
    await nextCicle();
    expect(fn).toBeCalledTimes(3);
    expect(fn).toBeCalledWith("test2");
  });

  test("should listen to item changes without initial call", async () => {
    LocationHashStorage.setItem("test", "initial"); // Set initial value

    const fn = mock();

    const unsub = LocationHashStorage.listenItem(
      "test",
      (value: string | null) => {
        fn(value);
      },
    );

    await nextCicle();

    expect(unsub).toBeFunction();
    // Should NOT be called initially
    expect(fn).toBeCalledTimes(0);

    LocationHashStorage.setItem("test", "first");
    await nextCicle();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith("first");

    LocationHashStorage.setItem("test", "first");
    await nextCicle();
    // Should not be called again for the same value
    expect(fn).toBeCalledTimes(1);

    LocationHashStorage.setItem("test", "second");
    await nextCicle();
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith("second");
  });
});
