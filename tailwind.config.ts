import type { Config } from "tailwindcss";

const config: Config = {
   theme: {
      extend: {
         fontFamily: {
            headline: ["var(--font-swiss-721-extended)", "sans-serif"],
         },
         colors: {
            background: "var(--color-background)",
            foreground: "var(--color-foreground)",
            primary: "var(--color-primary)",
            theme: {
               speed: "var(--color-theme-speed)",
            },
         },
         fontSize: {
            sm: "12px",
            base: "14px",
            md: "20px",
            "headline-base": "30px",
            "headline-md": "36px",
            "headline-lg": "57px",
         },
      },
      screens: {
         base: "1440px",
      },
   },
};

export default config;
