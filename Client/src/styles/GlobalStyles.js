import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root{
        /* Applied to both light and dark mode */
        --color-white-0: #fff; 
        --color-white-30: #f7f7f71a;
        --color-white-50: rgba( 255, 255, 255, 0.15 );
        --color-white-70: #0000;
        --color-white-100: rgba( 255, 255, 255, 0.18 );
        --color-white-110: #e8eaeb;
        --color-white-120: #caced1;
        --color-white-130: #ccc;
        --color-white-150: #c7c7c7;
        --color-white-200: #d3d3d3;
        --color-white-250: rgba(0, 0, 0, 0.3);
        
        --color-black-0: #000;
        --color-black-50: #000a;

        --color-red-0: #f7c1c1;
        --color-purple-50: #fa4362;
        --color-red-100: #fa1a4d;

        --color-blue-50: rgba( 31, 38, 135, 0.37 );
    
        --color-green-50: #e8f7e8;
        --color-green-70: #dcefd1;
        --color-green-80: #ddefd2;
        --color-green-100: #aaffaa;
        --color-green-150: #3da30274;
        --color-green-200: rgb(4, 170, 109);


        &.light-mode{ /* Default / Light mode */

            /* Background Color Shades */
            --color-bg-1: #2c8bb3;
            --color-bg-2: #2e92bc;
            --color-text: #000;
            --color-text-reverse: #fff;
        }

        &.dark-mode { /* Dark mode */

            /* Background Color Shades */
            --color-bg-1: #0a052f;
            --color-bg-2: #07041b;
            --color-text: #fff;
            --color-text-reverse: #000;
        }
    }

    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        /* Creating animations for dark mode */
        transition: background-color 0.3s, border 0.3s;
    }

    html {
        max-width: 100dvw;
        font-size: 62.5%;
        scroll-behavior: smooth;

        @media (max-width: 780px) {
            font-size: 60%;
        }

        @media (max-width: 700px) {
            font-size: 58%;
        }

        @media (max-width: 650px) {
            font-size: 55%;
        }

        @media (max-width: 500px) {
            font-size: 52%;
        }

        @media (max-width: 465px) {
            font-size: 50%;
        }
    }

    body {
        font-family: 'Nunito', sans-serif;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background: var(--color-bg-1); /* Fallback background color */
        background: linear-gradient(30deg, var(--color-bg-1) 0%, var(--color-bg-1) 60%, var(--color-bg-2) 60%, var(--color-bg-2) 100%) no-repeat center center fixed;
        /* background: linear-gradient(30deg, #0a052f 0%, #0a052f 60%, #07041b 60%, #07041b 100%) no-repeat center center fixed; */
        color: var(--color-white-0);
        transition: color 0.3s, background-color 0.3s;
        min-height: 100vh;
        min-height: 100dvh;
        line-height: 1.5;
        font-size: 1.6rem;
    }

    img {
        filter: drop-shadow(10px 10px 20px rgba(50,50,50, 0.1));
    }

    
`;

export default GlobalStyles;