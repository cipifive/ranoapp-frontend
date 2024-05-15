/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    screens: {
      'tablet': '100px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1550px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily : {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'lis' : ['lis-titles','sans'],
      'game' : ['game-titles','sans'],
      'game2' : ['game2-titles','sans'],
    },
    extend: {
      backgroundImage: {
        'loading-pattern' : "url('./src/assets/textil_logo.png')",
        'login-background' : "url('./src/assets/login-background.jfif')"
      }
    },
    
  },
  plugins: [
    
  ],
}
