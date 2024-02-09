import styled from "styled-components";
import ButtonTools from "./ButtonTools";
import { useNavigate } from "react-router-dom";
import FeaturesList from "./FeaturesList";

const StyledMoreTools= styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    padding-bottom: 2rem;
`;
const H2= styled.h2`
    font-size: 2.4rem;
    border-bottom: 1px solid var(--color-white-0);
    margin-bottom: 1rem;
`;
const Container= styled.div`
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;

    @media (max-width: 300px) {
        gap: 1.5rem;
        flex-direction: column;
    }

`;

function MoreTools({tool1, tool2}) {
    const navigate= useNavigate();
    const {link1, src1, alt1, name1} = tool1;
    const {link2, src2, alt2, name2} = tool2;

    return (
        <StyledMoreTools>
            <FeaturesList></FeaturesList>
            <H2>More tools :</H2>
            <Container>
                <ButtonTools onClick={() => navigate(link1) }><img src={src1} alt={alt1} />&nbsp; {name1}</ButtonTools>
                <ButtonTools onClick={() => navigate(link2) }><img src={src2} alt={alt2} />&nbsp; {name2}</ButtonTools>
            </Container>

            
        </StyledMoreTools>
    );
}

export default MoreTools;
