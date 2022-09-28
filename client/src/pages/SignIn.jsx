import React, {useRef,useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import "./wrong.css"
import "./Home.css"
import "./singin.css"
import { axiosInstance } from "../Config";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height:100vh;
  color: ${({ theme }) => theme.text};
`;
const General=styled.div``

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter} !important;
  border: 1px solid ${({ theme }) => theme.soft} !important;
  padding: 20px 50px;
  gap: 10px;
  box-shadow:0 0 40px -10px #000;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Light=styled.a
`
color:${props=>props.theme.text};
cursor:pointer`

const WrapperText=styled.h6
`
color:${props=>props.theme.text};
text-align:center;

`
const SignIn = ({darkMode,setDarkMode}) => {
  const wrong=useRef()
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const dispatch=useDispatch()

  const handlekeyforlogin=async(e)=>
  {
    if(e.key==="Enter")
    {

try 
{
  dispatch(loginStart())
 const res= await axiosInstance.post("/auth/login",{name:name.toLocaleLowerCase(),password:password})
res.status(200) && dispatch(loginSuccess(res.data))
}
catch(e)
{
wrong.current.classList.toggle("wup")
dispatch(loginFailure())

}

  }
    
  }
  const handleLogin=async(e)=>
  {
e.preventDefault()
try 
{
  dispatch(loginStart())
 const res= await axiosInstance.post("/auth/login/",{name:name.toLowerCase(),password:password})
res.status===200 && dispatch(loginSuccess(res.data))
}
catch(e)
{
  dispatch(loginFailure())
  wrong.current.classList.toggle("wup")
}

  }
  return (
    <General className="changeOP">
    <Container>
      <div style={{display:"none"}} className="scrollmenu">
      <Link to="/">
  Home
</Link>
<Link to="/trends">
  explore
</Link>
<Link to="/subscriptions">
  Subscriptions
</Link>

<Link to="/updateprofile">
  Settings
</Link>
<Link to="/help">
  Help
</Link>
<Light onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Light>
</div>
      <Wrapper onSubmit={e=>handleLogin(e)} className="reportWrapper">
  <h2 className="h2h2h2">Sign In</h2>
  <p className="para"><Input type="name" name="name" required onChange={e=>setName(e.target.value)} className="Inp"  placeholder="Username"/></p>
  <p className="para"><Input type="password" name="password" required onChange={e=>setPassword(e.target.value)} className="Inp" placeholder="Password"/></p>
  <h6 ref={wrong} style={{display:"none",color:"crimson"}}>Wrong User name or Password</h6>
  <Input style={{width:"55%"}} type="submit" value="Sign In" className="btnbtn"/>
  <br/>
  <Link style={{textDecoration:"none"}} to="/reset">
  <WrapperText className="Wrappertxt">
  Forgot Password?
  </WrapperText>
</Link>
<Link style={{textDecoration:"none"}} to="/Signup">
  <WrapperText className="Wrappertxt">
  Don't have an account?
  </WrapperText>
</Link>

      </Wrapper>

      </Container>
</General>
  );
};

export default SignIn;
