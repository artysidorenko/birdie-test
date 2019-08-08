import * as React from 'react';
import { NavLink } from 'react-router-dom';
// import { Button } from 'reakit/Button';
import styled from 'styled-components';
import Logo from '@App/components/Logo';

const buttons = [
  { title: 'Home', link: '/' },
  { title: 'General', link: '/general' },
  { title: 'Nutrition', link: '/nutrition' },
  { title: 'Other', link: '/other' }
];

const StyledNavLink = styled(NavLink)`
  background-color: white;
  border: 2px solid #e7e7e7;
  color: black;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;
  width: 75px;

  &:hover {
    background-color: #e7e7e7;
  }
`;

const StyledLogo = styled(Logo)`
  align-self: flex-start
`;

const MenuBar = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between
  padding-left: 20px;
  padding-right: 20px;
  * {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Menu = () => (
  <MenuBar>
    <StyledLogo src={require('../assets/images/logo-birdie.svg')} />
    <div>
      {buttons.map(button => (
        <StyledNavLink
          key={button.title}
          to={button.link}
          activeStyle={{
            fontWeight: 'bold',
            borderColor: 'grey'
          }}
        >
          {button.title}
        </StyledNavLink>
      ))}
    </div>
  </MenuBar>
);

export default Menu;
