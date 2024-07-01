import styled, { keyframes } from "styled-components";

const l111= keyframes`
  100% {top:-0.2px}
`;

const l112= keyframes`
  4%,96% {transform: scaleY(1)}
`;

const l113= keyframes`
  100% {transform: scaleY(0.3) translate(0.1px,-0.1px)}
`;

const anime2 = keyframes`
  to{opacity: 0}
`;

const Loader1 = styled.div`
  margin-top: 7rem;
  font-weight: bold;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  animation: ${anime2} 0.5s linear infinite alternate;

  &:before {
    content: "Loading ⏳ This might take a while 🕓";
    font-size: 2rem;
  }

  @media (max-width:300px){
    font-size: 12px;
  }
`;

const Anime= styled.div`
  margin: 0rem auto;
  width: 6.4rem;
  aspect-ratio: 1;
  display: grid;
  transform: translateY(100%);

  &:before,&:after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    transform-origin: bottom;
    position: relative;
  }
  &:before{
    background: radial-gradient(at 30% 30%,var(--color-white-70),var(--color-black-50)) var(--color-red-100);
    transform: scaleY(0.65);
    top: 0;
    animation: ${l111}, ${l112};
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier(0,400,1,400),ease;
    animation-iteration-count: infinite;
  }
  &:after{
    background: var(--color-white-130);
    filter: blur(8px);
    transform: scaleY(0.3) translate(0px,0px);
    left: 0;
    animation: ${l113} 1.2s cubic-bezier(0,400,1,400) infinite;
  }
`;

const StyledSpinner = styled.div`
  margin: 4.8rem auto;
  
`;

function Spinner() {
  return (
    <StyledSpinner>
      <Anime></Anime>
      <Loader1></Loader1>
    </StyledSpinner>
  );
}


export default Spinner;
