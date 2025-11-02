/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        theme: {
          primary: "#6b21a8", // purple-700
          primary_dark: "#581c87", // purple-800
          primary_focus: "#a855f7", // purple-500
        },
      },
    },
  },
  plugins: [],
};
