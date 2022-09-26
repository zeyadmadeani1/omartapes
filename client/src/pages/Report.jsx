import { useState } from "react";
import { useSelector } from "react-redux";
import emailjs from '@emailjs/browser';
import styled from "styled-components"
import {Link} from "react-router-dom"
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import "./Report.css"
import { useRef } from "react";
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
const Containerr = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: ${({ theme }) => theme.text};
min-height:100vh;
`;
const General=styled.div``
const Area=styled.textarea`color:${props=>props.theme.text};
width:220px;
`
const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter} !important;
  border: 1px solid ${({ theme }) => theme.soft} !important;
  padding: 20px 90px;
  gap: 10px;
  text-align:center;
  box-shadow:0 0 40px -10px #000;
  border-radius:30px;
  width:340px;
`;

const Light=styled.a
`
color:${props=>props.theme.text};
cursor:pointer`
const Input = styled.input`
display:flex;
justify-content:center;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 230px;
  color: ${props=>props.theme.text};
`;

const Report = ({setDarkMode,darkMode}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const form = useRef();
  const {currentUser}=useSelector(props=>props.user)
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_959pjkx', 'template_b8sa2io', form.current, 'exHBRi8aT1lX-MqAC')
      .then((result) => {
        handleOpen()
      }, (error) => {

      });
  };

  return (

  <General className="changeOP">
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
{currentUser? <Containerr className="con">

  <Wrapper ref={form} className="Wrapper" onSubmit={sendEmail}>
  <h2 className="h2h2h2">CONTACT US</h2>
  <p className="para" ><Input className="Inp" type="name" name="name" value={`${currentUser.name}`} placeholder="Your Name.." disabled></Input></p>
  <p className="para" ><Input className="Inp" type="email" name="email" value={`${currentUser.email}`} placeholder="Your Email.." disabled></Input></p>
  <p className="para" ><Area required type="message" name="message" rows={4} className="Inp" placeholder="What would you like to tell us.."></Area></p>
  <Input className="sm11" style={{borderRadius:10}} type="submit" value="Send Message"/>
      </Wrapper>
      </Containerr> : 
      <Containerr className="con">
  <Wrapper ref={form} className="Wrapper" onSubmit={sendEmail}>
  <h2 className="h2h2h2">CONTACT US</h2>
  <p className="para" type="Name:"><Input className="Inp" type="name" name="name" placeholder="Your Name.." ></Input></p>
  <p className="para" type="Email:"><Input Input className="Inp" type="email" name="email" placeholder="Your Email.." ></Input></p>
  <p className="para" type="Message:"><Area type="message" name="message" rows={4} className="Inp" placeholder="What would you like to tell us.."></Area></p>
  <Input style={{borderRadius:10}} className="btnbtn sm11" type="submit" value="Send Message"/>
      </Wrapper>
      </Containerr> }
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
          We have successfully recieved your message and we will get back to you shortly!
          </Typography>
          <br/>
          <button className="xx0x0x0xx" style={{textAlign:"center",display:"block",margin:"0 auto",width:"15%",borderRadius:"10%"}} onClick={handleClose}>Ok</button>
        </Box>
      </Modal>
    </div>
      </General>
  );
};
export default Report
