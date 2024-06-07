import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const StyledAppLayout= styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
`;

function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <Outlet />
            <Footer />
        </StyledAppLayout>
    );
}

export default AppLayout;
