# @jondotsoy/location-hash-storage

A lightweight storage solution inspired by the `localStorage` and `sessionStorage` APIs, but using the browser's `window.location.hash` to persist data in the URL.

## Features

- **Familiar API**: Uses the same interface as `localStorage` and `sessionStorage` (`getItem`, `setItem`, `removeItem`)
- **URL-based persistence**: Data is stored in the URL hash, making it shareable and bookmarkable
- **Reactive updates**: Subscribe to changes with `subscribeItem` for real-time updates
- **Browser navigation support**: Automatically syncs when the hash changes via back/forward buttons
- **Type-safe**: Written in TypeScript with full type definitions
- **Zero dependencies**: Lightweight implementation with no external dependencies
- **SSR-safe**: Gracefully handles server-side rendering environments

## Installation

```bash
npm install @jondotsoy/location-hash-storage
```

```bash
bun add @jondotsoy/location-hash-storage
```

## Usage

### Basic Operations

```typescript
import { LocationHashStorage } from "@jondotsoy/location-hash-storage";

// Set a value
LocationHashStorage.setItem("theme", "dark");
// URL becomes: #theme=dark

// Get a value
const theme = LocationHashStorage.getItem("theme");
console.log(theme); // 'dark'

// Remove a value
LocationHashStorage.removeItem("theme");
// URL becomes: #

// Multiple values
LocationHashStorage.setItem("user", "john");
LocationHashStorage.setItem("lang", "es");
// URL becomes: #user=john&lang=es
```

### Reactive Updates

Subscribe to changes for specific keys:

```typescript
// Listen to theme changes
const unsubscribe = LocationHashStorage.subscribeItem("theme", (value) => {
  console.log("Theme is now:", value);
  document.body.className = value || "light";
});

// The callback is called immediately with the current value
// and whenever the hash changes (via setItem, removeItem, or browser navigation)

// Stop listening when no longer needed
unsubscribe();
```

## API

### `LocationHashStorage.getItem(key: string): string | null`

Retrieves the value associated with the given key from the URL hash.

**Returns:** The value as a string, or `null` if the key doesn't exist.

### `LocationHashStorage.setItem(key: string, value: string): void`

Sets the value for the given key in the URL hash.

**Parameters:**

- `key`: The key to store the value under
- `value`: The string value to store

### `LocationHashStorage.removeItem(key: string): void`

Removes the key-value pair from the URL hash.

**Parameters:**

- `key`: The key to remove

### `LocationHashStorage.subscribeItem(key: string, callback: (value: string | null) => void): () => void`

Subscribes to changes for a specific key in the URL hash. The callback is called immediately with the current value and whenever the value changes.

**Parameters:**

- `key`: The key to watch for changes
- `callback`: Function called with the current/new value

**Returns:** An unsubscribe function to stop listening to changes

**Example:**

```typescript
const unsubscribe = LocationHashStorage.subscribeItem("theme", (value) => {
  console.log("Theme changed to:", value);
});

// Later, stop listening
unsubscribe();
```

## Use Cases

- Sharing application state via URL
- Preserving UI state across page reloads
- Creating shareable links with pre-filled forms
- Implementing simple routing without a router library
- A/B testing with URL parameters

## How It Works

The library reads and writes to `window.location.hash` using the `URLSearchParams` API. It listens to the `hashchange` event to keep the internal state synchronized with browser navigation (back/forward buttons).

## License

MIT © 2025 Jonathan Delgado

## Author

Jonathan Delgado - [hi@jon.soy](mailto:hi@jon.soy)
