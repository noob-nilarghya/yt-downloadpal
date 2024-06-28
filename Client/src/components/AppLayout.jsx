import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const StyledAppLayout= styled.div`
    width: 100dvw;
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
