// tailwind.config.js
const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|avatar|button|card|chip|date-picker|image|link|modal|navbar|pagination|select|skeleton|toggle|table|tabs|user|ripple|spinner|form|input|listbox|divider|popover|scroll-shadow|calendar|date-input|checkbox|spacer).js"
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};