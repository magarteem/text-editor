/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        tag: "9px",
      },
      borderRadius: {
        table: "32px",
      },
      boxShadow: {
        main: "0px 8px 24px -6px rgba(224, 234, 241, 0.30), 0px 0px 1px 0px rgba(153, 181, 200, 0.30)",
        input:
          "0px 0px 4px -6px rgba(224, 234, 241, 0.60) inset, 0px 0px 2px 0px rgba(153, 181, 200, 0.80) inset",
      },
      blur: {
        xs: "3px",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            },
            h2: {
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            },
            h3: {
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            },
            p: {
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
            },
            ul: {
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
              p: {
                marginTop: theme("spacing.1"),
                marginBottom: theme("spacing.1"),
              },
            },
            ol: {
              marginTop: theme("spacing.1"),
              marginBottom: theme("spacing.1"),
              p: {
                marginTop: theme("spacing.1"),
                marginBottom: theme("spacing.1"),
              },
            },
          },
        },
      }),
    },
    colors: {
      "black-not-so": "#262a39",
      gray: "#626c76",
      "grey-light": "#97a1ab",
      "gray-bright": "#f3f7fa",
      "black-transparent": "rgba(38, 42, 57, 0.8)",
      "white-platinum": "#e5e5e5",
      "white-dirty": "#eaf0f5",
      white: "#fff",
      "blue-marian": "#214080",
      "blue-highlight": "#3b63b8",
      "blue-ukrainian": "#c3ddf0",
      "blue-bright-highlight": "#d7ecff",
      "blue-light": "#ecf7ff",
      "blue-bright": "#f9fcff",
      "orange-giants": "#ff542c",
      "orange-true": "#ff7e60",
      "orange-light": "#ffd2c4",
      "orange-bright": "#ffe5dd",
      "red-saturated": "#f22e2e",
      red: "#fc6e6e",
      "red-dirty": "#fee2e2",
      "red-light": "#fbdcde",
      "red-bright": "#ffeff0",
      "yellow-deep": "#fd9b53",
      "yellow-deep-light": "#fcede3",
      yellow: "#f2c836",
      "yellow-light": "#fbedd0",
      "yellow-bright": "#fefeef",
      violet: "#d762d9",
      "violet-light": "#faddff",
      raspberries: "#fe5d8d",
      "raspberries-light": "#fadde8",
      purple: "#7545fc",
      "purple-light": "#e3ddff",
      "purple-bright": "#e7e8ff",
      "green-black": "#218159",
      green: "#16ba1e",
      "green-light": "#cff7d5",
      "green-dirty": "#1abe8c",
      "green-dirty-bright": "#94edd2",
      "green-dirty-light": "#d1f7ee",
      "sea-blue": "#1c84cf",
      "sea-blue-light": "#daedfb",
      background: "#f9fcff",
      "hover-white": "#eef8ff",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
