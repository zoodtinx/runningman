module.exports = {
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
      },
      screens: {
         base: "1440px",
      },
   },
};
