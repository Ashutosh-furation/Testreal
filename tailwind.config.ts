import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./Redux/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        adminblack: "#000000",
        adminloginbg: "#CACACA",
        primaryfont: "#B6B6B6",
        secondryfont: "#C2C2C2",
      },
      fontFamily: {
        bodyFont: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xxxs: ".45rem",
        xxs: ".5rem",
        xs: ".55rem",
      },
    },
  },
  plugins: [],
};
export default config;
