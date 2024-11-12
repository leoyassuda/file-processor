# File Processor

This API uses the Bun framework and Express to process files and likely handle user orders based on the provided TypeScript code snippets.

**Features:**

- Handles file uploads using Multer.
- Processes uploaded files (details of processing are not available in the given code).
- Manages user orders, including order totals, dates, and product information (as seen in `orderResponseMapper.ts`).

**Getting Started:**

1. **Clone Repository:** Clone this repository to your local machine.

2. **Install Dependencies:** Run `bun install` in your terminal from the project root directory.

3. **Start Server:** Execute `bun run start` to start the API server.
   1. By default will start on port 3000.
   2. This project uses a memory database for simplicity and speed of development.

**Further Information:**

- Explore the `routes.ts` file for details on routing, API endpoints, and file processing logic.
- Examine the TypeScript files in the `@dtos`, `@entities`, and `@utils` directories for data structures and utility functions used by the application.

**Example using curl for POST file upload:**

```bash
curl -X POST \
  http://localhost:3000/api/orders/upload \
  -F "file=@path/to/your/file"
```

**To install Bun:**

- Download: Go to the official Bun website [bun](https://bun.sh/) and download the installer for your operating system.

- Install on Linux or Mac:
  - `curl -fsSL https://bun.sh/install | bash`
- Install on Windows:
  - `powershell -c "irm bun.sh/install.ps1 | iex"`
