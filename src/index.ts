class Store<T> {
  #subs = new Set<(nextValue: T) => any>();
  #value: T;

  constructor(initial: T) {
    this.#value = initial;
  }

  listen(cb: (nextValue: T) => any) {
    this.#subs.add(cb);
    return () => {
      this.#subs.delete(cb);
    };
  }

  subscribe(cb: (nextValue: T) => any) {
    const unsub = this.listen(cb);
    cb(this.#value);
    return unsub;
  }

  get() {
    return this.#value;
  }

  set(nextValue: T) {
    this.#value = nextValue;
    this.#subs.forEach((cb) => cb(nextValue));
  }
}

const atom = <T>(initial: T) => new Store<T>(initial);

class Type<T> {
  #value: T;

  constructor(v: T) {
    this.#value = v;
  }

  // asObject(): undefined | Type<Record<string, unknown>> {
  //     if (typeof this.#value === "object" && this.#value !== null) {
  //         return this as Type<Record<string, unknown>>;
  //     }
  //     return undefined;
  // }

  // asString(): undefined | Type<string> {
  //     if (typeof this.#value === "string") {
  //         return this as Type<string>;
  //     }
  //     return undefined;
  // }

  asStringOrUndefined(): undefined | Type<string | undefined> {
    if (typeof this.#value === "string" || typeof this.#value === "undefined") {
      return this as Type<string | undefined>;
    }
    return undefined;
  }

  asFunction(): undefined | Type<Function> {
    if (typeof this.#value === "function") {
      return this as Type<Function>;
    }
    return undefined;
  }

  property(key: string): undefined | Type<unknown> {
    if (
      typeof this.#value === "object" &&
      this.#value !== null &&
      key in this.#value
    ) {
      return new Type((this.#value as any)[key]) as Type<unknown>;
    }
    return undefined;
  }

  withProperty<K extends string>(
    key: K,
  ): undefined | Type<T & Record<K, unknown>> {
    if (
      typeof this.#value === "object" &&
      this.#value !== null &&
      key in this.#value
    ) {
      return this as any;
    }
    return undefined;
  }

  withPropertyAsStringOrUndefined<K extends string>(
    key: K,
  ): undefined | Type<T & Record<K, string>> {
    const v: any = this.#value;
    if (
      typeof v === "object" &&
      v !== null &&
      key in v &&
      typeof v[key] === "string"
    ) {
      return this as any;
    }
    return undefined;
  }

  valueOf(): T {
    return this.#value;
  }
}

const t = <T>(v: T) => new Type(v);

const getBrowserWindow = () => {
  type EventListener = (type: string, cb: (event: any) => any) => any;
  const window = t(globalThis).property("window");
  const location = window
    ?.property("location")
    ?.withPropertyAsStringOrUndefined("hash")
    ?.valueOf() ?? { hash: "" };
  const addEventListener: EventListener =
    (window
      ?.property("addEventListener")
      ?.asFunction()
      ?.valueOf() as EventListener) ?? (() => {});

  return {
    location,
    addEventListener: addEventListener.bind(window?.valueOf()),
  };
};

const browserWindow = getBrowserWindow();

const loadLocationHash = () => {
  const hash = browserWindow.location.hash.slice(1); // Remover el #
  const params = new URLSearchParams(hash);
  return params;
};

const locationHash = atom(loadLocationHash());

locationHash.subscribe((v) => {
  console.log(v);
});

browserWindow.addEventListener("hashchange", () => {
  locationHash.set(loadLocationHash());
});

export class LocationHashStorage {
  static getItem = (key: string) => {
    return locationHash.get().get(key) ?? null;
  };
  static setItem = (key: string, value: string) => {
    const params = locationHash.get();
    params.set(key, value);
    browserWindow.location.hash = params.toString();
    locationHash.set(params);
  };
  static removeItem = (key: string) => {
    const params = locationHash.get();
    params.delete(key);
    browserWindow.location.hash = params.toString();
    locationHash.set(params);
  };
  static subscribeItem = (key: string, cb: (value: string | null) => void) => {
    let previousValue: string | null = null;

    const unsub = locationHash.subscribe(() => {
      const currentValue = LocationHashStorage.getItem(key);
      if (currentValue !== previousValue) {
        previousValue = currentValue;
        cb(currentValue);
      }
    });

    return unsub;
  };
  static listenItem = (key: string, cb: (value: string | null) => void) => {
    let previousValue: string | null = LocationHashStorage.getItem(key);

    const unsub = locationHash.listen(() => {
      const currentValue = LocationHashStorage.getItem(key);
      if (currentValue !== previousValue) {
        previousValue = currentValue;
        cb(currentValue);
      }
    });

    return unsub;
  };
}
