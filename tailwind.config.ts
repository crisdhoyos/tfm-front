import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-background":
          "linear-gradient(180deg, var(--bg-color), var(--bg-color-secondary))",
        "logo-background":
          "linear-gradient(180deg, var(--logo-b), var(--logo-a))",
        "background-repeat": "no-repeat",
      },
      colors: {
        ring: "var(--ring)",
        foreground: "var(--foreground)",
        success: "var(--success)",
        error: "var(--error)",
        skeleton: "var(--skeleton)",
        "bg-color": {
          DEFAULT: "var(--bg-color)",
          secondary: "var(--bg-color-secondary)",
        },
        input: {
          border: "var(--input-border)",
          bg: "var(--input-bg)",
          text: "var(--input-text)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        toast: "slideIn 0.5s ease-in-out, fadeOut 0.5s ease-in-out 3s forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
