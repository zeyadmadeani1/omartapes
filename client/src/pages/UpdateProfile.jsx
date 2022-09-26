import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../Config"
import styled from "styled-components"
import "./UpdateProfile.css"
import UploadIcon from '@mui/icons-material/Upload'
import { changeName, image,logOut } from "../redux/userSlice";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase/firebase"
import { Link, useNavigate } from "react-router-dom";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import "./Home.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  min-height:100vh;
`;
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
const Border=styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: ${({ theme }) => theme.bgLighter};
border: 1px solid ${({ theme }) => theme.soft};
padding: 20px 50px;
gap: 10px;
box-shadow:0 0 40px -10px #000;
border-radius:30px;
`
const Light=styled.a
`
color:${props=>props.theme.text};
cursor:pointer`
const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
  box-shadow:0 0 40px -10px #000;
  border-radius:30px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Buttonn = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;
const General=styled.div``
const FileInput=styled.input`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;


const UpdateProfile = ({darkMode,setDarkMode}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const {currentUser}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const uname=useRef()
    const navigate=useNavigate()
    const [img,setImg]=useState("")
    const [imgPerc,setImgPerc]=useState(0)
    const password=useRef()
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const handlePhoto=async(e)=>
    {
      uploadFile(e)
    }
  
    const uploadFile=(file)=>
    {
const storage=getStorage(app)
const filename=new Date().getTime()+file.name
const storageRef=ref(storage,filename)
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
setImgPerc(Math.round(progress))
    switch (snapshot.state) {
      case 'paused':

        break;
      case 'running':

        break;
        default: break;
    }
  }, 
  (error) => {

  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    
      const updateUser=async()=>
      {
await axiosInstance.put(`/users/${currentUser._id}`,{Img:downloadURL})
setImg(downloadURL)
dispatch(image(img))
      }
      window.location.reload()
      updateUser()
    });
  }
);

}
    const handleUserChange=async(e)=>
    {
        try 
        {
          dispatch(changeName(uname.current.value))
         const res=await axiosInstance.put(`/users/${currentUser._id}`,{name:uname.current.value})
         res.status===200 && window.alert("Username has been updated successfully.")
        }
        catch(e)
        {
            throw e
        }

    }

    const handlePassChange=async(e)=>
    {
        try 
        {
        const res= await axiosInstance.put(`/users/${currentUser._id}`,{password:password.current.value}) 
         res.status===200 && window.alert("password has been changed successfully! Please log in with the new password to continue.")
         res.status===200 && dispatch(logOut()) && navigate("/")
        }
        catch(e)
        {
            throw e
        }
    }
    const handleDeleteAccount=async()=>
    {
      const res=await axiosInstance.delete(`/users/${currentUser._id}`)
      res.status===200 && dispatch(logOut())
      handleClose()
      
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
{!currentUser? <h1 style={{textAlign:"center"}}>Please Log In to Update your Profile Information.</h1>
:
<Border className="editBorder">
<Title style={{textAlign:"center"}}>Update your Profile Information</Title>
<SubTitle style={{textAlign:"center"}} className="minimizeTextonMobile">Please edit the field that you want to update.</SubTitle>
<Input placeholder="username" ref={uname}/>
<Input style={{border:"none"}} onClick={e=>handleUserChange(e)} type="submit" value="Update Username"/>
<Input ref={password} type="password" placeholder="password"/>
<Input style={{border:"none"}} onClick={e=>handlePassChange(e)} type="submit" value="Update Password"/>
<br/>
<Wrapper className="Wrapper">
{
  imgPerc<=0? <label className="shareOption" htmlFor="file">
<UploadIcon className="shareIcon"/>
<span className="shareOptionText minimizeTextonMobile">Upload a new Photo</span>
 <FileInput style={{display:"none"}} type="file" id="file" accept="image/*" onChange={(e)=>{handlePhoto(e.target.files[0])}}/>
<br/>
</label>
 : "Uploaded "+ imgPerc +" %"
}
</Wrapper>
<br/>
<Buttonn onClick={handleOpen} style={{color:"crimson",backgroundColor:"transparent"}}>Delete your account</Buttonn>
 </Border>
}
</Container>
<div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bgcolcol" sx={style}>
          <Typography style={{textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2">
Are you sure you want to continue?
          </Typography>
          <Typography style={{textAlign:"center"}} id="modal-modal-description" sx={{ mt: 2 }}>
Deleting your account is permanent and can't be reversed.
          </Typography>
          <div style={{textAlign:"center"}}>
            <br/>
          <Button style={{color:"#000"}} onClick={handleClose}>
            No
          </Button>
          <Button style={{color:"#000"}} onClick={handleDeleteAccount}>
            Yes
          </Button>
          </div>
        </Box>
      </Modal>
    </div>
</General>
  );
};

export default UpdateProfile;
