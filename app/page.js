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

const JUNK_KEYWORDS = ['fried', 'sugary', 'processed', 'greasy', 'deep-fried', 'refined flour'];

function classifyFood({ name, description, preparation }) {
  const normalizedName = name.trim().toLowerCase();
  const details = `${description} ${preparation}`.trim().toLowerCase();

  if (!normalizedName) {
    return {
      kind: 'empty',
      message: 'Please complete the form and submit to get your result.',
    };
  }

  if (JUNK_FOODS.has(normalizedName)) {
    return {
      kind: 'junk',
      message: `${name} is considered junk food.`,
    };
  }

  const hasJunkKeyword = JUNK_KEYWORDS.some((keyword) => details.includes(keyword));

  if (hasJunkKeyword) {
    return {
      kind: 'junk',
      message: `${name} sounds like junk food based on its description or preparation.`,
    };
  }

  return {
    kind: 'not-junk',
    message: `${name} is not in our junk list, so we will call it not junk food.`,
  };
}

export default function HomePage() {
  const [food, setFood] = useState('');
  const [description, setDescription] = useState('');
  const [preparation, setPreparation] = useState('');
  const [submission, setSubmission] = useState(null);

  const result = useMemo(
    () =>
      submission
        ? classifyFood(submission)
        : {
            kind: 'empty',
            message: 'Fill out all fields, then submit to check whether the food is junk or not.',
          },
    [submission],
  );

  function handleSubmit(event) {
    event.preventDefault();

    setSubmission({
      name: food,
      description,
      preparation,
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center p-6">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">Junk or No</h1>
        <p className="mt-2 text-slate-600">
          Add a food item, a short description, and how it is made. Submit the form to see whether
          it is junk food.
        </p>

        <form onSubmit={handleSubmit}>
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

          <label htmlFor="description" className="mt-4 block text-sm font-medium text-slate-700">
            Short description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Example: Cheesy and salty"
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />

          <label htmlFor="preparation" className="mt-4 block text-sm font-medium text-slate-700">
            How it's made
          </label>
          <textarea
            id="preparation"
            value={preparation}
            onChange={(event) => setPreparation(event.target.value)}
            placeholder="Example: Deep-fried and served hot"
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Check food
          </button>
        </form>

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
          Tip: Try chips with a preparation note like “deep-fried in oil”.
        </p>
      </div>
    </main>
  );
}
