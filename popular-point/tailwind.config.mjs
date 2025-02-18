/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      back: "#rgba(0,1,35,1)",
      black: "#000",
      body: "rgba(0, 33, 33, 1)",
      gray: "#52525b",
      teal: "#004d4d",
      header: "#000808",
      subText: "#818181",
      infoBorder: "#96a9ff",
      infoIcon: "#96ddff",
      ideaIcon: "#ffed96",
      starIcon: "#dddddd",
      starBorder: "#b0b0b0",
      ideaBorder: "#ffe048",
      boxBG: "#000000",
      action: "#00274d",
      link: "#000a3a",
      diamond: "rgba(132, 132, 170, 1)",
      homeBorder: "#c0c0c0",
      pb: "linear-gradient(270deg, rgba(97,123,255,1) 0%, rgba(0,1,35,1) 100%)",
    },
    fontFamily: {
      sans: ["PP Mori", "sans-serif"],
      //serif: ["goudy_old_style_pro-regular", "serif"],
      //serifBold: ["goudy_old_style_pro-bold", "serif"],
      //serifItalic: ["goudy_old_style_pro-italic", "serif"],
      serif: ["PP Eiko", "serif"],
      mono: ["dm", "monospace"],
    },
    extend: {
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
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-action": {
          textShadow:
            "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;",
        },
        ".gradient-text": {
          backgroundImage:
            "linear-gradient(270deg, rgba(97,123,255,1) 0%, rgba(0,1,35,1) 100%);",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent", // Makes the gradient visible inside the text
          WebkitTextFillColor: "transparent",
          "-moz-background-clip": "text", // Firefox
          textFillColor: "rgba(0,1,35,1)", // Fallback solid color for Firefox
        },
      });
    },
  ],
};
