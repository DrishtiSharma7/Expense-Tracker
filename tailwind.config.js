/** @type {import('tailwindcss').Config} */
export default {
  // telling tailwind where to look for classes so it doesn't purge them
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // just adding one custom color for the sidebar, everything else is default tailwind
        darksidebar: "#111827",
      },
    },
  },
  plugins: [],
};
