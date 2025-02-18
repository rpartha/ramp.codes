import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypePrettyCode from "rehype-pretty-code";
import hyper from "./src/styles/hyper.json";

const options = {
  // Specify the theme to use or a custom theme json, in our case
  // it will be a moonlight-II theme from
  // https://github.com/atomiks/moonlight-vscode-theme/blob/master/src/moonlight-ii.json
  theme: hyper,
};

export default defineConfig({
  site: "https://ramp.codes",
  integrations: [mdx(), sitemap({}), tailwind()],
  markdown: {
    syntaxHighlight: false, // Disable syntax built-in syntax hightlighting from astro
    rehypePlugins: [[rehypePrettyCode, options]],
    //remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
});
