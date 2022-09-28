import { axiosInstance } from "../Config";
import React, { useRef, useState } from "react"
import styled from "styled-components"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useParams } from "react-router-dom";
import "./Home.css"
const Container=styled.div
`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height:100vh;
color: ${({ theme }) => theme.text};
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
  width: 100%;
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
const ResetPassword=()=>
{
    const {token}=useParams()
    const input1=useRef()
    const input2=useRef()
    const hTag=useRef()
    const [password,setPassword]=useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const [email,setEmail]=useState("")
const [success,setSuccess]=useState(false)
const handleNewPass=(e)=>
{
  e.preventDefault()
  if(input1.current.value===input2.current.value)
{
  const handleSub=async()=>
  {
const res=await axiosInstance.post(`/auth/newpass`,{password:password,token:token})
res.status===200 && setSuccess(true)
  }
  handleSub()
  handleOpen()
}
 else 
 {
  hTag.current.classList.toggle("wup")
 }
}
return(<>
<Container>
<Holder>
<Wrapper onSubmit={e=>handleNewPass(e)}>
<Label>
Please type your new password
</Label>
<Input ref={input1} onChange={e=>setPassword(e.target.value)} required type="password"/>
<Label>
Please retype your new password
</Label>
<Input ref={input2} onChange={e=>setPassword(e.target.value)} required type="password"/>
<h6 ref={hTag} style={{color:"crimson",display:"none"}} className="psw">Password don't match</h6>
<Input type="submit" value="Change Password"/>
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
{success ? "Your Password has been reset successfully!" : "Something Went Wrong. Please Try again later!"}
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
export default ResetPassword