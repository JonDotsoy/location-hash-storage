# @jondotsoy/location-hash-storage

A lightweight storage solution inspired by the `localStorage` and `sessionStorage` APIs, but using the browser's `window.location.hash` to persist data in the URL.

## Features

- **Familiar API**: Uses the same interface as `localStorage` and `sessionStorage` (`getItem`, `setItem`, `removeItem`)
- **URL-based persistence**: Data is stored in the URL hash, making it shareable and bookmarkable
- **Reactive updates**: Automatically syncs when the hash changes via browser navigation
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

## API

### `LocationHashStorage.getItem(key: string): string | null`

Retrieves the value associated with the given key from the URL hash.

### `LocationHashStorage.setItem(key: string, value: string): void`

Sets the value for the given key in the URL hash.

### `LocationHashStorage.removeItem(key: string): void`

Removes the key-value pair from the URL hash.

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
