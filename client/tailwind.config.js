// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path covers all your components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Set Poppins as the default sans-serif font
      },
      colors: {
        primary: '#8352FD',
        secondary: '#1F2937',
        accent: '#3B82F6',
      },
    },
  },
  plugins: [],
};