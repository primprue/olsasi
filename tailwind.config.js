/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "!./src/**/*.module.css", // Excluye archivos module.css
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
