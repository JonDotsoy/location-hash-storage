# Contributing to @jondotsoy/location-hash-storage

Thank you for your interest in contributing to this project! Your help is greatly appreciated.

## Getting Started

### Prerequisites

This project uses [Bun](https://bun.sh) as its runtime and package manager. Make sure you have it installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

Or visit [bun.sh](https://bun.sh) for other installation methods.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/jondotsoy/location-hash-storage.git
cd location-hash-storage
bun install
```

## Development Workflow

### Running Tests

This project uses two types of tests:

#### Unit Tests (Bun)

Unit tests are located in `src/**/*.spec.ts` and run with Bun's built-in test runner:

```bash
bun test
```

#### End-to-End Tests (Playwright)

E2E tests are located in the `tests/` directory and run with Playwright:

```bash
bun playwright
```

### Code Formatting

Keep the code clean and consistent using Bun's formatter:

```bash
bun fmt
```

Run this before committing your changes.

### Building

To build the project:

```bash
bun run build
```

## Guidelines

- **Write tests**: Make sure to add or update tests for any new features or bug fixes
- **Keep tests updated**: Ensure all tests pass before submitting a pull request
- **Format your code**: Run `bun fmt` to maintain code consistency
- **Follow conventions**: Match the existing code style and patterns
- **Document changes**: Update the README.md if you add new features

## Submitting Changes

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes
4. Run tests: `bun test` and `bun playwright`
5. Format code: `bun fmt`
6. Commit your changes with a clear message
7. Push to your fork
8. Open a pull request

## Questions?

Feel free to open an issue if you have any questions or need help getting started.

Thank you for contributing!
