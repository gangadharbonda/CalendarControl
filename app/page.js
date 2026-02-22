'use client';

import { useMemo, useState } from 'react';

const JUNK_FOODS = new Set([
  'chips',
  'fries',
  'french fries',
  'donut',
  'doughnut',
  'candy',
  'chocolate bar',
  'soda',
  'burger',
  'pizza',
  'ice cream',
  'hot dog',
  'fried chicken',
  'cookie',
  'cupcake',
  'nachos',
  'milkshake',
  'instant noodles',
]);

function classifyFood(foodName) {
  const normalized = foodName.trim().toLowerCase();

  if (!normalized) {
    return {
      kind: 'empty',
      message: 'Please type a food item to get started.',
    };
  }

  if (JUNK_FOODS.has(normalized)) {
    return {
      kind: 'junk',
      message: `${foodName} is considered junk food.`,
    };
  }

  return {
    kind: 'not-junk',
    message: `${foodName} is not in our junk list, so we will call it not junk food.`,
  };
}

export default function HomePage() {
  const [food, setFood] = useState('');

  const result = useMemo(() => classifyFood(food), [food]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center p-6">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">Junk or No</h1>
        <p className="mt-2 text-slate-600">
          Enter a food name and this beginner-friendly app will tell you if it is junk food.
        </p>

        <label htmlFor="food" className="mt-6 block text-sm font-medium text-slate-700">
          Food item
        </label>
        <input
          id="food"
          type="text"
          value={food}
          onChange={(event) => setFood(event.target.value)}
          placeholder="Example: Pizza"
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />

        <div
          className={`mt-6 rounded-lg border p-4 text-lg font-medium ${
            result.kind === 'junk'
              ? 'border-red-200 bg-red-50 text-junk'
              : result.kind === 'not-junk'
              ? 'border-green-200 bg-green-50 text-healthy'
              : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          {result.message}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Tip: Try typing chips, soda, burger, or donut.
        </p>
      </div>
    </main>
  );
}
