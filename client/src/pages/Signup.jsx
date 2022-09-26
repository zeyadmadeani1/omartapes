import React, {useRef,useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../Config";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import "./wrong.css"
import "./Home.css"
import "./singin.css"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
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
const Signup = ({darkMode,setDarkMode}) => {
  const wrong=useRef()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handlekeyforsignup=async(e)=>
{
  try 
  {
if(e.key==="Enter")
{
  const res= await axiosInstance.post("/auth/register",{name:name.toLocaleLowerCase(),email:email,password:password})
  res && handleOpen()
}
  }
  catch(e)
  {
throw e
  }
}
  const handleSignup=async(e)=>
  {
    e.preventDefault()
    try 
    {
const res= await axiosInstance.post("/auth/register/",{name:name.toLowerCase(),email:email.toLowerCase(),password:password})
res.status===200 && handleOpen()
    }
    catch(e)
    {
throw e
    }}
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
      <Wrapper onSubmit={handleSignup} className="reportWrapper">
  <h2 className="h2h2h2">Sign Up</h2>
  <p className="para"><Input required type="email" name="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" className="Inp" /></p>
  <p className="para"><Input required type="name"  name="name" onChange={e=>setName(e.target.value)} placeholder="Username" className="Inp" /></p>
  <p className="para"><Input required type="password" name="password" onKeyPress={(e)=>{handlekeyforsignup(e)}} onChange={e=>setPassword(e.target.value)} className="Inp" placeholder="Password"/></p>
  <Input style={{width:"55%"}} type="submit" value="Sign Up" className="btnbtn"/>
  <br/>
  <Link style={{textDecoration:"none"}} to="/signin">
  <WrapperText className="Wrappertxt">
Go to Login
  </WrapperText>
</Link>
      </Wrapper>
      </Container>
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
Success!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
You have successfully Registered. Please <Link to="/signin">login</Link> to continue.
          </Typography>
        </Box>
      </Modal>
    </div>
</General>
  );
};

export default Signup;
