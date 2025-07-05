import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },

            // colors: {
            //     primary: "#1E3A8A","#2E86C1" // azul oscuro
            //     secondary: "#3B82F6","#27AE60" // azul claro
            //     accent: "#F59E0B", // amarillo/anaranjado
            //     neutral: "#F2FAF7", // verde muy claro (como tu fondo)
            //     placeholder: "#A3BFFA", // azul claro para placeholder
            //     // también podés redefinir colores base si querés:
            //     gray: {
            //         100: "#f7fafc",
            //         900: "#1a202c",
            //     },
            // },
            colors: {
                primary: "#1E3A8A",
                secondary: "#3B82F6",
                background: "#F2FAF7",
                text: "#2E86C1",
                "text-secondary": "#7F8C8D",
                label: "#5499C7",
                placeholder: "#A9CCE3",
                "input-border": "#D5D8DC",
                "input-hover": "#2E86C1",
                "input-focus": "#27AE60",
                error: "#E74C3C",
                success: "#A9DFBF",
            },
    //         colors: {
    //     background: '#F2FAF7',
    //     primary: '#2E86C1',
    //     text: '#2E86C1',
    //     'text-secondary': '#5DADE2',
    //     label: '#5499C7',
    //     placeholder: '#A9CCE3',
    //     'input-bg': '#FFFFFF',
    //     'input-border': '#D6EAF8',
    //     'input-hover': '#85C1E9',
    //     'input-focus': '#2E86C1',
    //     'input-error': '#5DADE2',
    //     success: '#D6EAF8',
    //   },
        },
    },

    plugins: [forms],
};
