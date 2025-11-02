"use client";

import { handleLogin } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full px-4 py-3 text-white font-bold rounded-md bg-theme-primary hover:bg-theme-primary_dark transition-colors"
      type="submit"
      disabled={pending}
    >
      {pending ? "Logging in..." : "LOGIN"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(handleLogin, initialState);

  return (
    <div className="text-center">
      <h2 className="text-5xl font-extrabold mb-12 text-theme-primary">
        Login
      </h2>
      <form action={formAction} className="space-y-8">
        {state?.error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{state.error}</span>
          </div>
        )}
        <div className="relative border-b-2 focus-within:border-theme-primary">
          <span className="absolute left-0 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full pl-8 pr-4 py-2 text-lg bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="relative border-b-2 focus-within:border-theme-primary">
          <span className="absolute left-0 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full pl-8 pr-4 py-2 text-lg bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="text-right">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Forgot Password?
          </a>
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
