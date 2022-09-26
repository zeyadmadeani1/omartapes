import React from "react";
import styled from "styled-components";
import LamaTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import "./Menu.css"
const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  flex:2;
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;

`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props=>props.theme.text};
  border-color:${props=>props.theme.text};
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {

  return (
    <Container className="HideMe">
      <Wrapper>
        <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={LamaTube} />
            OmarTapes
          </Logo>
        </Link>
        <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <HomeIcon />
          Home
        </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        </Link>

        <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        </Link> 
        
        <Hr />
        
        <Link to="updateprofile" style={{textDecoration: "none",color:"inherit"}}>
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        </Link>
<Link to="help" style={{textDecoration: "none",color:"inherit"}}>

        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        </Link>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
