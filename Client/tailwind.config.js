module.exports = {
  darkMode: "class",
  content: [
    "./*.*",
    "./src/*.*",
    "./src/*/*.*",
    "./src/*/*/*.*",
    "./src/*/*/*/*.*",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          DEFAULT: "#FE8C52",
          50: "#FEBA96",
          100: "#FEB48F",
          200: "#FEAA80",
          300: "#FEA070",
          400: "#FE9661",
          500: "#FE8C52",
          600: "#FE8243",
          700: "#FE7834",
          800: "#FE6E24",
          900: "#FE6415",
        },
        brew: {
          DEFAULT: "#347AEB",
          50: "#73A3F1",
          100: "#6C9FF0",
          200: "#5E95EF",
          300: "#508CEE",
          400: "#4283EC",
          500: "#347AEB",
          600: "#2671EA",
          700: "#1868E8",
          800: "#1661DB",
          900: "#145BCE",
        },
        indigo: {
          DEFAULT: "#4A58D4",
          50: "#828BE1",
          100: "#7B86E0",
          200: "#6F7ADD",
          300: "#636FDA",
          400: "#5663D7",
          500: "#4A58D4",
          600: "#3E4DD1",
          700: "#3141CE",
          800: "#2E3DC2",
          900: "#2B39B6",
        },
        bray: {
          DEFAULT: "#191926",
          50: "#343450",
          100: "#31314B",
          200: "#2B2B42",
          300: "#252538",
          400: "#1F1F2F",
          500: "#191926",
          600: "#13131D",
          700: "#0D0D14",
          800: "#07070A",
          900: "#010101",
        },
        gore: {
          DEFAULT: "#171736",
          50: "#2C2C66",
          100: "#292961",
          200: "#252556",
          300: "#20204B",
          400: "#1C1C41",
          500: "#171736",
          600: "#12122B",
          700: "#0E0E21",
          800: "#090916",
          900: "#05050B",
        },
        shark: {
          DEFAULT: "#1C1C1F",
          50: "#3D3D43",
          100: "#39393F",
          200: "#323237",
          300: "#2B2B2F",
          400: "#232327",
          500: "#1C1C1F",
          600: "#151517",
          700: "#0D0D0F",
          800: "#060607",
          900: "#000000",
        },
        gold: {
          DEFAULT: "#D4C64A",
          50: "#E1D882",
          100: "#E0D67B",
          200: "#DDD26F",
          300: "#DACE63",
          400: "#D7CA56",
          500: "#D4C64A",
          600: "#D1C23E",
          700: "#CEBE31",
          800: "#C2B32E",
          900: "#B6A82B",
        },
        amethyst: {
          DEFAULT: "#A14AD4",
          50: "#BE82E1",
          100: "#BB7BE0",
          200: "#B46FDD",
          300: "#AE63DA",
          400: "#A756D7",
          500: "#A14AD4",
          600: "#9B3ED1",
          700: "#9431CE",
          800: "#8B2EC2",
          900: "#822BB6",
        },
        emerald: {
          DEFAULT: "#4AD45A",
          50: "#82E18D",
          100: "#7BE087",
          200: "#6FDD7C",
          300: "#63DA71",
          400: "#56D765",
          500: "#4AD45A",
          600: "#3ED14F",
          700: "#31CE43",
          800: "#2EC23F",
          900: "#2BB63B",
        },
        valencia: {
          DEFAULT: "#D44A4A",
          50: "#E18282",
          100: "#E07B7B",
          200: "#DD6F6F",
          300: "#DA6363",
          400: "#D75656",
          500: "#D44A4A",
          600: "#D13E3E",
          700: "#CE3131",
          800: "#C22E2E",
          900: "#B62B2B",
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
