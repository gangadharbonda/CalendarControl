# Junk or No

A beginner-friendly Next.js + Tailwind CSS app where users type a food item and instantly see if it is junk food or not.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## How it works

- The app contains a small list of common junk foods.
- User input is normalized (trimmed + lowercased).
- If the food is in the list, it is marked as junk food.
- Otherwise, the app says it is not junk food.
