#!/bin/bash

# Add Homebrew to PATH
export PATH="/opt/homebrew/bin:$PATH"

# Navigate to project
cd /Users/sven/maxess

# Start the dev server
echo "Starting Maxxes dev server..."
echo "Open http://localhost:5173 in your browser"
echo ""
npm run dev
