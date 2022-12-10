/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'ccBlack':'#101820FF',
        'ccOrange':'#F2AA4CFF',
        'ccLight':' #E1E2E2'
      }
    },
 
  },
  plugins: [],
}