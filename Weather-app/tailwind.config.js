/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#202b3b",
        secondary: "#7e5bef",
        main: "#0b131e",

        header: "#e1e1e3",
        text: "#bac2ce",
        text2: "#5f6773",
      },
      variants: {
        placeholderColor: ["responsive", "focus", "hover"],
      },
    },
  },
  plugins: [],
};
