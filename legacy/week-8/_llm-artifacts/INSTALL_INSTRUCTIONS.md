# 🚨 Node.js Required - Installation Instructions

## Current Issue

When you run `npm run dev`, the command hangs because **Node.js is not installed** on your system.

## Solution: Install Node.js

You have 2 options:

### Option 1: Install via Homebrew (Recommended)

Homebrew is a package manager for macOS that makes installing developer tools easy.

```bash
# 1. Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js
brew install node

# 3. Verify installation
node --version
npm --version
```

### Option 2: Direct Download from Node.js

1. Visit: https://nodejs.org/en/download/
2. Download **macOS Installer (.pkg)** for your chip:
   - **Apple Silicon (M1/M2/M3)**: ARM64 version
   - **Intel Mac**: x64 version
3. Run the installer
4. Follow the installation wizard

### After Installing Node.js

Once Node.js is installed, run these commands:

```bash
# Navigate to the project
cd /Users/sven/maxess

# Install project dependencies
npm install

# Start the development server
npm run dev
```

You should see output like:

```
VITE v6.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

Then open your browser to: **http://localhost:5173**

## Verify Your Installation

After installing Node.js, verify it's working:

```bash
# Check Node.js version (should be 18.x or higher)
node --version

# Check npm version (should be 9.x or higher)
npm --version

# Check that npm is in your PATH
which npm
```

Expected output:
```
v20.x.x  (or v18.x.x)
10.x.x   (or 9.x.x)
/usr/local/bin/npm  (or /opt/homebrew/bin/npm)
```

## Troubleshooting

### If `npm` command not found after installation:

1. Close and reopen your terminal
2. Or run: `source ~/.zshrc` (or `source ~/.bash_profile`)

### If you're on Apple Silicon (M1/M2/M3):

Make sure you install the ARM64 version of Node.js, not the x64 version.

### If port 5173 is already in use:

```bash
# Kill any process using port 5173
lsof -ti :5173 | xargs kill -9

# Then restart the dev server
npm run dev
```

## What Happens After npm install

When you run `npm install`, it will install all project dependencies:

- SvelteKit (framework)
- Svelte 5 (UI library)
- Vite (build tool)
- Lucide Svelte (icons)
- Zod (validation)
- TypeScript
- And many other dev dependencies

This process takes 1-3 minutes and downloads ~300MB of packages.

## Expected File Structure After Installation

```
/Users/sven/maxess/
├── node_modules/          ← Created after npm install
├── package-lock.json      ← Created after npm install
├── .svelte-kit/          ← Created when dev server starts
├── package.json           ✅ Already there
├── src/                   ✅ Already there
└── ... other files        ✅ Already there
```

## Next Steps After Server is Running

1. Open http://localhost:5173 in your browser
2. Navigate through all 5 screens using the bottom nav
3. Test interactive features (toggles, filters, etc.)
4. Make changes to `.svelte` files - they hot-reload automatically!

---

**Quick Commands Summary:**

```bash
# Install Node.js (choose one method above)
brew install node

# Install dependencies
cd /Users/sven/maxess
npm install

# Run development server
npm run dev

# Build for production (when ready)
npm run build
```

