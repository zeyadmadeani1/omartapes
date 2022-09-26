import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase/firebase"
import { axiosInstance } from "../Config";
import { useNavigate } from "react-router-dom";
import "./Upload.css"
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  z-index:99999999999999999999999999999;
  align-items: center;
  justify-content: center;
`;
const General=styled.div``
const Wrapper = styled.form`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({setOpen}) => {
  const navigate=useNavigate()
    const [img,setImg]=useState(undefined)
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [video,setVideo]=useState(undefined)
    const [imgPerc,setImgPerc]=useState(0)
    const [videoPerc,setVideoPerc]=useState(0)
    const [inputs,setInputs]=useState({})
const handleUpload=async(e)=>
{
e.preventDefault()
const res=await axiosInstance.post(`/videos/`,{...inputs,Title:title,desc:desc})
setOpen(false)
res.status===200 && navigate(`/video/${res.data._id}`)
}
    useEffect(()=>
    {
    img &&  uploadFile(img,"imgUrl")
    },[img])
    useEffect(()=>
    {
     video && uploadFile(video,"videoUrl")
    },[video])

    const uploadFile=(file,urlType)=>
    {
const storage=getStorage(app)
const filename=new Date().getTime()+file.name
const storageRef=ref(storage,filename)
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType==="imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
    switch (snapshot.state) {
      case 'paused':

        break;
      case 'running':

        break;
        default: break;
    }
  }, 
  (error) => {
throw error
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setInputs((prev)=>
        {
          return ({...prev,[urlType]:downloadURL})
        })
    });
  }
);

}
  return (
    <General className="changeOP">

    <Container>
      <Wrapper onSubmit={e=>handleUpload(e)}>
        <Close onClick={()=>{setOpen(false)}}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
              {videoPerc>0? "Uploading: " + videoPerc+"%" : 
                      <Input style={{height:"50%"}} type="file"
                      accept="video/*"
                      required
                      onChange={e=>{setVideo(e.target.files[0])}} />
              }

        <Input
        required
          type="text"
          placeholder="Title"
          name="Title"
        onChange={e=>setTitle(e.target.value)}
        />
        <Desc
        required
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={e=>setDesc(e.target.value)}
        />
        <Label>Image:</Label>
        {imgPerc>0? "Uploading: " + imgPerc+"%" : 
        imgPerc===100? "Uploaded successfully":
                      <Input type="file"
                      accept="image/*"
                      required
                      style={{height:"50%"}}
                      onChange={e=>{setImg(e.target.files[0])}} />
              }

        <Input type="submit" value="Upload" />
      </Wrapper>
    </Container>
    </General>
  );
};

export default Upload;
