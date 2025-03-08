/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Define your colors using CSS variables
        back: "var(--color-back)",
        black: "#000",
        subtle: "var(--color-subtle)",
        body: "var(--color-body)",
        gray: "#52525b",
        copy: "#6B7280",
        teal: "var(--color-teal)",
        header: "var(--color-header)",
        subText: "var(--color-subText)",
        infoBorder: "var(--color-infoBorder)",
        infoIcon: "var(--color-infoIcon)",
        ideaIcon: "var(--color-ideaIcon)",
        starIcon: "var(--color-starIcon)",
        starBorder: "var(--color-starBorder)",
        ideaBorder: "var(--color-ideaBorder)",
        boxBG: "var(--color-boxBG)",
        action: "var(--color-action)",
        link: "var(--color-link)",
        subLink: "var(--color-subLink)",
        asus: "#00529c",
        oneplusk: "#f50514",
        glacier: "var(--color-glacier)",
        finder: "#2997ff",
        redir: "var(--color-redir)",
        diamond: "var(--color-diamond)",
        homeBorder: "var(--color-homeBorder)",
        agree: "#228B22",
      },
      fontFamily: {
        sans: ["PP Mori", "sans-serif"],
        serif: ["PP Eiko", "serif"],
        mono: ["dm", "monospace"],
      },
      textShadow: {
        action:
          "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;",
      },
      screens: {
        olg: "1080px", // Custom breakpoint for OnePlus 13
      },
    },
  },
  plugins: [
    function ({ addBase, addUtilities }) {
      // Add base styles with CSS variables
      addBase({
        ":root": {
          // Light mode values
          "--color-back": "rgba(0,1,35,1)",
          "--color-subtle": "hsl(240, 3%, 8%)",
          "--color-body": "rgba(0, 33, 33, 1)",
          "--color-teal": "#004d4d",
          "--color-header": "#000a3a",
          "--color-subText": "#818181",
          "--color-infoBorder": "#699ab2",
          "--color-infoIcon": "#96ddff",
          "--color-ideaIcon": "#ffed96",
          "--color-starIcon": "#dddddd",
          "--color-starBorder": "#b0b0b0",
          "--color-ideaBorder": "#b2a569",
          "--color-boxBG": "#000000",
          "--color-action": "#00274d",
          "--color-link": "#000622",
          "--color-subLink": "#3a00ff",
          "--color-glacier": "#c5c6c7",
          "--color-redir": "#19224d",
          "--color-diamond": "rgba(132, 132, 170, 1)",
          "--color-homeBorder": "#c0c0c0",
          "--gradient-pb":
            "linear-gradient(270deg, rgba(97,123,255,1) 0%, rgba(0,1,35,1) 100%)",
        },
        ".dark": {
          // Dark mode values
          "--color-back": "rgba(0,1,35,1)",
          "--color-subtle": "hsl(240, 3%, 8%)",
          "--color-body": "#D4D4D8",
          "--color-teal": "#004d4d",
          "--color-header": "#E4E4E7", // Changed for dark mode
          "--color-subText": "#D4D4D8",
          "--color-infoBorder": "#699ab2",
          "--color-infoIcon": "#96ddff",
          "--color-ideaIcon": "#ffed96",
          "--color-starIcon": "#dddddd",
          "--color-starBorder": "#b0b0b0",
          "--color-ideaBorder": "#b2a569",
          "--color-boxBG": "#000000",
          "--color-action": "#00274d",
          "--color-link": "#B2B5C3",
          "--color-subLink": "#3a00ff",
          "--color-glacier": "#c5c6c7",
          "--color-redir": "#999db0",
          "--color-diamond": "rgba(132, 132, 170, 1)",
          "--color-homeBorder": "#c0c0c0",
          "--gradient-pb":
            "linear-gradient(270deg, rgba(97,123,255,1) 0%, rgba(0,1,35,1) 100%)",
        },
      });

      // Add text shadow utility
      addUtilities({
        ".text-shadow-action": {
          textShadow:
            "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;",
        },
      });
    },
  ],
};
