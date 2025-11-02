"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleLogin } from "@/app/actions";

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn !text-white !bg-blue-600 !hover:bg-blue-700"
      type="submit"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(handleLogin, initialState);

  return (
    <form action={formAction}>
      {state?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{state.error}</span>
        </div>
      )}
      <input
        type="email"
        className="border p-2 mb-4 w-full text-center"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="border p-2 mb-4 w-full text-center"
        id="password"
        name="password"
        placeholder="Password"
        required
      />
      <SubmitButton />
    </form>
  );
}
