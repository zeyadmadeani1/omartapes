import { axiosInstance } from "../Config";
import React, { useState } from "react"
import styled from "styled-components"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
const Container=styled.div
`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height:100vh;
color: ${({ theme }) => theme.text};
`
const Light=styled.a
`
color:${props=>props.theme.text};
cursor:pointer`
const WrapperText=styled.h6
`
color:${props=>props.theme.text};
text-align:center;
`
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
  border: 1px solid ${({ theme }) => theme.textSoft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 80%;
  color: ${({ theme }) => theme.text};
`;
const Label=styled.label
`
text-align:center;
`
const Form=styled.form
`
display:flex;
flex-direction:column;
gap:30px;
`
const Holder=styled.div
`
display:flex;
flex-direction:column;
gap:30px;
`
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
const Reset=({darkMode,setDarkMode})=>
{
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const [email,setEmail]=useState("")
const handleReset=(e)=>
{
    e.preventDefault()
    const handleSub=async()=>
    {
const res=await axiosInstance.post(`/auth/reset`,{email:email})
    }
    handleSub()
    handleOpen()
}
return(<>
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
<Container>
<Holder>
<Wrapper onSubmit={handleReset}>
<Label >
Please enter your email to search for your account.
</Label>
<Input required onChange={e=>{setEmail(e.target.value)}} type="email"/>
<Input type="submit" value="Search"/>
</Wrapper>
</Holder>
</Container>
<div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bgcolcol" sx={style}>

          <Typography style={{textAlign:"center"}} id="modal-modal-description" sx={{ mt: 2 }}>
We have sent an email to you with a reset link if email exists in our records. Please make sure to check your spam folder.
          </Typography>
          <div style={{textAlign:"center"}}>
            <br/>
          <Button onClick={handleClose} style={{color:"#000"}}>
  ok
          </Button>
          </div>
        </Box>
      </Modal>
    </div>
</>)
}
export default Reset