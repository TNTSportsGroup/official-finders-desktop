import * as React from 'react';
// import {Link} from 'react-router-dom';

import {Button, Menu, Icon} from 'antd';
import styled from 'styled-components';
// import { routes } from '../constants/routes';

const Btn = styled.button`
    color: white

`;

const Header = styled.h1`
    color: white;
    font-size: 45px;
`


export const Home = () => (
    <div style={{height: '100%', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundImage: 'linear-gradient(45deg, rgba(0, 216, 255, 0.5) 10%, rgba(0, 1, 127, 0.7))'}}>
    <div style={{ padding: 10, color: "white", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        <Header>Home</Header>
        <Button type='primary'>Btn</Button>
        <Btn>Btn</Btn>
    
    
    </div>
    </div>
    
    
    
)