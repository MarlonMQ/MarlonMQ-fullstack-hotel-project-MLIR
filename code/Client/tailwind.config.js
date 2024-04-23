module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {  
        roboto: ['Roboto', 'sans-serif'],  
        Jersey: ['Jersey', 'sans-serif'],
      },
      colors: {
        'primary': '#0A1128',
        'secondary': '#001F54',
        'third': '#034078',
        'fourth': '#7dd3fc',
      },
    },
  },
}

