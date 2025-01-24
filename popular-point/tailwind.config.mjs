/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      back: "#030d13",
      black: "#000",
      body: "rgba(0, 33, 33, 1)",
      gray: "#52525b",
      teal: "#004d4d",
      header: "#000808",
      subText: "#002222",
      infoBorder: "#96a9ff",
      infoIcon: "#96ddff",
      ideaIcon: "#ffed96",
      ideaBorder: "#ffe048",
      boxBG: "#111827",
      action: "#00274d",
      copy: "#eacce3",
      logo: "linear-gradient(135deg, #004d4d 0%, #b6cccc 100%)",
    },
    fontFamily: {
      sans: ["Satoshi-Variable", "sans-serif"],
      sansItalic: ["Satoshi-VariableItalic", "sans-serif"],
      serif: ["goudy_old_style_pro-regular", "serif"],
      serifBold: ["goudy_old_style_pro-bold", "serif"],
      serifItalic: ["goudy_old_style_pro-italic", "serif"],
      mono: ["dm", "monospace"],
      body: ["__clean-custom"],
      bodyItalic: ["__clean-custom"],
    },
    extend: {
      textShadow: {
        action:
          "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;",
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
          backgroundImage: "linear-gradient(135deg, #004d4d 0%, #b6cccc 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent", // Makes the gradient visible inside the text
          WebkitTextFillColor: "transparent",
          "-moz-background-clip": "text", // Firefox
          textFillColor: "#004d4d", // Fallback solid color for Firefox
        },
      });
    },
  ],
};
