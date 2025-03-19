/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // Ensures Tailwind scans the right files
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "spin-fast": "spin 0.3s linear infinite",
        "float-right": "floatRight 0.5 ease-in-out",
      },
      keyframes: {
        floatRight: {
          "0%": { transform: "translateX(100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      boxShadow: {
        inset: "inset 2px 2px 20px #000",
      },
    }, // Customize your theme here
  },
  plugins: [], // Add Tailwind plugins if needed
};
