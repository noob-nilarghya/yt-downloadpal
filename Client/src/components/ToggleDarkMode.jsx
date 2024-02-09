import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const Img= styled.img`
    cursor: pointer;
    display: block;
    transition: all 0.4s;

    &:hover{
        transform: scale(1.2);
    }

    /* @media (max-width: 500px) {
        width: 70%;
    } */
`

function ToggleDarkMode() {
    const {isDarkMode, toggleDarkMode} = useDarkMode();
    // console.log(isDarkMode);
    return (
        <div onClick={toggleDarkMode}>
            {isDarkMode ? <Img src="/sun.svg" alt="sun" /> : <Img src="/moon.svg" alt="moon" />}
        </div>
    );
}

export default ToggleDarkMode;
