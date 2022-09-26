import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import LamaTube from "../img/logo.png";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import "./avatar.css"
import { logOut } from "../redux/userSlice";
import Upload from "./Upload";
import Cookies from "js-cookie"
import 'bootstrap/dist/css/bootstrap.min.css'
import { axiosInstance } from "../Config";
const Container = styled.div`

  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;

`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;
const Img = styled.img`
  height: 25px;
`;

const Dropdown=styled.div`
position: absolute;
left:0;
right:0;
top:60px;
background-color:${props=>props.theme.bgLighter} !important;
color:${props=>props.theme.text};
right:5px;
width:100%;
height:95vh;
z-index:999;
background-color: #999;
border-radius: 20px;
transition: 0.3s ease-in-out;
opacity:0;
z-index:-99999;

`
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color:${props=>props.theme.text};
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 25px;
  color:${props=>props.theme.text};
  
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 8px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: ${props=>props.theme.text} !important;
  border-radius: 5%;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color:transparent !important;
  border-color:${props=>props.theme.text};
`;

const Item = styled.button`
  display:block;
  width:150px;
  border:none;
  color:white;
  text-align:center !important;
  background-color:transparent;
  align-items: center;
  color: ${props=>props.theme.text} !important;
border-color:${props=>props.theme.text};
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
`;
const NavName=styled.h3`color:${props=>props.theme.text}`
const User=styled.div`display:flex;
align-items:center;
gap:11px;
color:${props=>props.theme.text}`
const Avatar=styled.img`width:32px;
position:relative;
height:42px;
border-radius:50%;
background-color:#999;
`

const Navbar = () => {
  const target=useRef()
  const avatar=useRef()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {currentUser}=useSelector(state=>state.user)
  const [img,setImg]=useState("")
  const [open,setOpen]=useState(false)
  const [q,setQ]=useState("")
  useEffect(()=>
  {

    const getUser=async()=>
    {
      if(currentUser)
      {
        const res=await axiosInstance.get(`/users/find/${currentUser._id}`)
        setImg(res.data.Img)
      }

    }
    getUser()
  },[currentUser])
  const handleSignOut=(e)=>
  {

      dispatch(logOut())
      localStorage.clear()
      Cookies.remove('access_token')
      navigate("/signin")

  }
  const handleSearchOnEnter=(e)=>
  {
if(e.key==="Enter")
navigate(`/search?q=${q}`)
e.target.reset()
  }
const handleSearch=(e)=>
  {
navigate(`/search?q=${q}`)
  }
  const handleAvatar=()=>
  {
avatar.current.classList.toggle("hide")
  }

  return (
    <>
    <Container>
      <Wrapper style={{position:"relative"}}>
        <Search className="toLeft">
          <Input onKeyPress={e=>handleSearchOnEnter(e)} onChange={(e)=>setQ(e.target.value)} style={{position:"relative"}} placeholder="Search" />
          <Button onClick={handleSearch} style={{border:"none"}}>
          <SearchOutlinedIcon style={{position:"absolute",right:0}} className="icon" />
            </Button>
        </Search>
        <Logo className="ShowLogoOnMobile" style={{display:"none"}}>
            <Img src={LamaTube} />
            OmarTapes
          </Logo>
        {
          currentUser? <User className="userx">
            <VideoCallIcon className="hidevideo" style={{cursor:"pointer",margin:5}} onClick={()=>{setOpen(true)}}/>
            <Button onClick={handleAvatar} style={{border:"none",padding:0,backgroundColor:"transparent"}}>
            <Avatar style={{height:35,width:35}} className="Avatar" src={img ? img : "https://insightacademyofcommerce.com/wp-content/uploads/2021/08/facebook-profile-picture-no-pic-avatar.jpg" }/>
            <Dropdown  className="mainavtr onMob" ref={avatar}>
            <Avatar style={{width:100,height:100}}  className="Avatar" src={img ? img : "https://www.informatique-mania.com/wp-content/uploads/2021/04/foto-sin-rostro-de-facebook-780x470.jpg"}/>
            <br/> <br/>
            <NavName>{currentUser.name}</NavName>
            <br/>
            <NavName>{currentUser.email}</NavName>
            <br/>
            <Button onClick={()=>{setOpen(true)}} className="centerbtns xxxshowxxx" style={{borderRadius:10,margin:"0 auto",display:"none"}}>
            <Link to="updateprofile" style={{textDecoration: "none",color:"inherit"}}>
            <Item className="customsize">
          <span className="biggenonhover">
Add a Video
          </span>
        </Item>
        </Link>
            </Button>
            <br/>
            <Button className="centerbtns" style={{borderRadius:10,margin:"0 auto",display:"flex"}}>
            <Link to="updateprofile" style={{textDecoration: "none",color:"inherit"}}>
            <Item className="centerbtns biggenonhover customsize">
          <span className="biggenonhover">
Manage your account
          </span>

        </Item>
        
        </Link>
            </Button>       <br/>
            <Button className="centerbtns" style={{borderRadius:10,margin:"0 auto",display:"flex"}}>
            <Link to="updateprofile" style={{textDecoration: "none",color:"inherit"}}>
            <Item className="centerbtns biggenonhover customsize" onClick={e=>handleSignOut(e)} style={{display:"block",margin:"0 auto",marginTop:"30px",border:"1px solid", borderRadius:"5%",
  fontWeight: 500,padding:"5px 8px",
  border:"1px solid #3ea6ff",border:"none"}}>Sign Out</Item>
        
        </Link>
            </Button>       <br/>
 


            </Dropdown>

            </Button>
    <div className="ClassSignOut">
<Button ref={target} style={{border:"none",color:"#3ea6ff"}}>

</Button>
            </div>
          </User> :  <Link to="signin" style={{ textDecoration: "none" }}>
          <Button className="signinbtn">
            <AccountCircleOutlinedIcon />
            Sign In
          </Button>
        </Link>
        }
       
      </Wrapper>

    </Container>
    {open && <Upload setOpen={setOpen}/>}
    </>
  );
};

export default Navbar;
