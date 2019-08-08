import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  useMenuState,
  Menu,
  MenuItem,
  MenuDisclosure,
} from 'reakit/Menu';
import styled from 'styled-components';
import Logo from '@App/components/Logo';

const buttons = [
  { title: 'Home', link: '/' },
  { title: 'General', link: '/general' },
  { title: 'Nutrition', link: '/nutrition' },
  { title: 'Other', link: '/other' }
];

const sharedMenuStyle = `
  background-color: white;
  border: 2px solid #e7e7e7;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;
`;

const StyledNavLink = styled(NavLink)`
  ${sharedMenuStyle}
  padding: 16px 32px;
  margin: 4px 2px;
  &:hover {
    background-color: #e7e7e7;
  }
`;

const StyledMenuDisclosure = styled(MenuDisclosure)`
  ${sharedMenuStyle}
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledMenu = styled(Menu)`
  ${sharedMenuStyle}
  display: flex;
  flex-direction: column;
  font-weight: bold;
  background-color: white;
  z-index: 99;
`;

const StyledMenuItem = styled(MenuItem)`
  ${sharedMenuStyle}
  border: none;
  padding: 20px;
  margin: auto;
  font-weight: bold;
  background-color: white;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: block;
`;

const StyledLogo = styled(Logo)`
  align-self: flex-start
`;

const MobileLogo = styled(Logo)`
  height: 50px;
  width: auto;
`;

const MenuBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between
  box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,.1),
  0 0.9375rem 1.40625rem rgba(90,97,105,.1),
  0 0.25rem 0.53125rem rgba(90,97,105,.12),
  0 0.125rem 0.1875rem rgba(90,97,105,.1);
  padding: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 950px) {
    padding: 10px;
  }
`;

const RightSection = styled.div`
  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

const MenuDesktop = () => (
  <MenuBar>
    <StyledLogo src={require('../assets/images/logo-birdie.svg')} />
    <RightSection>
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
    </RightSection>
  </MenuBar>
);

const MenuMobile = () => {
  const menu = useMenuState();
  return (
    <MenuBar>
      <StyledMenuDisclosure {...menu}>
        Menu
      </StyledMenuDisclosure>
      <StyledMenu {...menu} aria-label="Menu">
        {buttons.map(button => (
          <StyledMenuItem {...menu} key={button.title}>
            <StyledLink to={button.link}>{button.title}</StyledLink>
          </StyledMenuItem>
        ))}
      </StyledMenu>
      <MobileLogo src={require('../assets/images/logo-birdie.svg')} />
    </MenuBar>
  );
};

const _Menu = window.innerWidth > 950 ? MenuDesktop : MenuMobile;

export default _Menu;
