import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Img= styled.img`
    width: 18rem;
    cursor: pointer;
`;

function Logo() {

    const navigate= useNavigate();
    function onClick(){
        navigate('/');
    }

    return (<Img onClick={onClick} src="/logo.webp" alt="logo" />);
}

export default Logo;
