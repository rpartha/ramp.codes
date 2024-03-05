/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      gray: '#52525b',
      teal: '#004d4d',
      dtcc: '#0e5447',
      header: '#ffbfe8',
      subText: '#ab95a5',
      edmunds: '#18406A',
      stonewain: '#F5AC3A',
      infoBorder: '#96a9ff',
      infoIcon: '#96ddff',
      ideaIcon: '#ffed96',
      ideaBorder: '#ffe463',
      boxBG: '#111827',
      pillBG: '#21222e',
      pillText: '#96ddff',
      link: '#FFA1A1',
    },
    fontFamily: {
      sans: ['Satoshi-Variable', 'sans-serif'],
      sansItalic: ['Satoshi-VariableItalic', 'sans-serif'],
      serif: ['goudy_old_style_pro-regular', 'serif'],
      serifBold: ['goudy_old_style_pro-bold', 'serif'],
      serifItalic: ['goudy_old_style_pro-italic', 'serif'],
      mono: ['dm', 'monospace'],
    },
  },
  plugins: [],
};
