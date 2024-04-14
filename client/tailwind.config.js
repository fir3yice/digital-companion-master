/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0B0B0F',
        'text': '#f0f0f4',
        'primary': '#f13c20',
        'secondary': '#4056a1',
        'accent': '#F4B324',
        'accent2': '#05A895',
        'text2': '#118ab2',
        'accent3': '#FB5A48'
       }, 
    },
  },
  plugins: [ require("flowbite/plugin"), ],
};
