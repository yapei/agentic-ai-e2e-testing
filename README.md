# Agentic AI E2E Testing

End-to-end QA workflow for [SauceDemo](https://www.saucedemo.com) checkout testing, driven by AI agents and Playwright MCP servers.

Covers user story **SCRUM-101**: cart review, checkout information, order overview, order completion, and error handling.

## Project Structure

```
user-stories/          # User stories and acceptance criteria
specs/                 # Test plans
tests/saucedemo-checkout/  # Playwright automation (22 test cases)
test-results/          # Test execution reports
.github/agents/        # Playwright test planner, generator, and healer agents
.cursor/               # Cursor MCP configuration
.vscode/               # VS Code MCP configuration
```

## Prerequisites

- Node.js 18+
- npm
- Git

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Set GitHub token for MCP (add to ~/.zshrc or ~/.bashrc)
export GITHUB_TOKEN=your_github_personal_access_token
```

Copy `.env.example` to `.env` and set your token if you prefer a local env file:

```bash
cp .env.example .env
```

## Run Tests

```bash
# All checkout tests (Chrome, Firefox, Safari)
npx playwright test tests/saucedemo-checkout/

# Single browser
npx playwright test tests/saucedemo-checkout/ --project=chromium

# View HTML report
npx playwright show-report
```

## MCP Servers

This project uses three MCP servers configured in `.cursor/mcp.json` and `.vscode/mcp.json`:

| Server | Purpose |
|--------|---------|
| `playwright` | Browser automation |
| `playwright-test` | Test planning, generation, and healing |
| `github` | GitHub repository operations |

The GitHub server reads your token from the `GITHUB_TOKEN` environment variable. Never commit real tokens to the repo.

## Test Coverage

- **22 test cases** across 5 acceptance criteria
- **66 automated runs** (22 tests × 3 browsers)
- Test plan: `specs/saucedemo-checkout-test-plan.md`
- Test report: `test-results/SCRUM-101-checkout-test-report.md`

## Application Under Test

- **URL:** https://www.saucedemo.com
- **Username:** `standard_user`
- **Password:** `secret_sauce`

## Workflow

This project follows a 7-step agentic QA workflow:

1. Read user story
2. Create test plan
3. Exploratory testing
4. Generate automation scripts
5. Execute and heal tests
6. Create test report
7. Commit to Git
