import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: "#5C1A2B",
          700: "#5C1A2B",
          800: "#4a1522",
          900: "#3A0F1B",
          soft: "#7C2C3E",
        },
        bone: "#FBF7EF",
        cream: "#F5EDE0",
        ember: {
          DEFAULT: "#C8552B",
          600: "#C8552B",
          bright: "#E07A33",
        },
        gold: {
          500: "#BC9255",
        },
        olive: {
          DEFAULT: "#5E6B3E",
          600: "#5E6B3E",
        },
        ink: {
          DEFAULT: "#2A1A18",
          soft: "#6A554F",
        },
        muted: "#6A554F",
        line: "#E2D9CC",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-karla)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "1200px",
      },
      boxShadow: {
        card: "0 18px 50px -22px rgba(58,15,27,.55)",
        hero: "0 30px 60px -20px rgba(0,0,0,.6)",
      },
    },
  },
  plugins: [],
}

export default config
