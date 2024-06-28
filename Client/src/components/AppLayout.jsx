import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const StyledAppLayout= styled.div`
    width: 98.5vw;
    width: 98.5dvw;
    display: grid;
    grid-template-rows: auto 1fr auto;
`;

function AppLayout() {

    return (
        <StyledAppLayout>
            <Header type="layout"/>
            <Outlet />
            <Footer />
        </StyledAppLayout>
    );
}

export default AppLayout;
