/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      back: "#rgba(0,1,35,1)",
      black: "#000",
      subtle: "hsl(240, 3%, 8%)",
      body: "rgba(0, 33, 33, 1)",
      gray: "#52525b",
      copy: "#6B7280",
      teal: "#004d4d",
      header: "#000808",
      subText: "#818181",
      infoBorder: "#699ab2",
      infoIcon: "#96ddff",
      ideaIcon: "#ffed96",
      starIcon: "#dddddd",
      starBorder: "#b0b0b0",
      ideaBorder: "#b2a569",
      boxBG: "#000000",
      action: "#00274d",
      link: "#000a3a",
      subLink: "#3a00ff",
      asus: "#00529c",
      oneplusk: "#f50514",
      glacier: "#c5c6c7",
      finder: "#2997ff",
      redir: "#19224d",
      diamond: "rgba(132, 132, 170, 1)",
      homeBorder: "#c0c0c0",
      pb: "linear-gradient(270deg, rgba(97,123,255,1) 0%, rgba(0,1,35,1) 100%)",
      agree: "#228B22",
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
      });
    },
  ],
};
