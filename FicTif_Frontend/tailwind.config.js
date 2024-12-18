/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  important: true,
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cupcake: {
          // eslint-disable-next-line no-undef
          ...require("daisyui/src/theming/themes")["cupcake"],
          primary: "#38bdf8",
          secondary: "#fb923c",
          neutral: "oklch(91.5861% 0.006811 53.440502 / 0.1) ",
        },
      },
      {
        dim: {
          // eslint-disable-next-line no-undef
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#38bdf8",
          secondary: "#fb923c",
        },
      },
    ],
  },
};
