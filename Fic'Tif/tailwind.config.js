/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  important: true,
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          primary: "#38bdf8",
          secondary: "#fb923c",
          neutral: "oklch(91.5861% 0.006811 53.440502 / 0.1) ",
        },
      },
      {
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#38bdf8",
          secondary: "#fb923c",
        },
      },
    ],
  },
};
