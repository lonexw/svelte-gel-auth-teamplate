import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1C008A",
        primarylight: "#F2EBFF",
        primaryhover: "#E4D6FF",
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
