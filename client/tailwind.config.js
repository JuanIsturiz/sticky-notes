/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-0": "#0f1214",
        "custom-1": "#040D12",
        "custom-2": "#091418",
        "custom-3": "#183D3D",
        "custom-4": "#5C8374",
        "custom-5": "#93B1A6",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
