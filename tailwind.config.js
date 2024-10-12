// tailwind.config.js
const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|chip|date-picker|image|link|modal|navbar|pagination|select|table|user|ripple|spinner|calendar|date-input|popover|listbox|divider|scroll-shadow|checkbox|spacer).js"
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};