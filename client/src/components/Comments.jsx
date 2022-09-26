import { axiosInstance } from "../Config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const Logintosee=styled.h2
`
text-align:center;
color:${props=>props.theme.text}
`

const Comments = ({videoId}) => {

  const [comments,setComments]=useState([])
  const [img,setImg]=useState("")
  const {currentUser}=useSelector(state=>state.user)
  const handleComment=async(e)=>
  {
if(e.key==="Enter")
{
await axiosInstance.post(`/comments/addcomment/`,{userId:currentUser._id,videoId:videoId,desc:e.target.value})
}

  }
  useEffect(()=>
  {

const fetchComents=async()=>
{
  const res=await axiosInstance.get(`/comments/${videoId}`)
  setComments(res.data)
}
fetchComents()
if(currentUser)
{
  const fetchUser=async()=>
  {
  const res=await axiosInstance.get(`/users/find/${currentUser._id}`)
  setImg(res.data.Img)
  }
  fetchUser()
}

  },[videoId])
  return (
currentUser ?
    <Container>
      <NewComment>
        <Avatar src={img? img : "https://www.informatique-mania.com/wp-content/uploads/2021/04/foto-sin-rostro-de-facebook-780x470.jpg"}/>
        <form>
        <Input onKeyPress={e=>{handleComment(e)}} style={{width:"50vw"}} placeholder="Add a comment..." />
        </form>
      </NewComment>
      <br/>      <br/>
{comments.map(comment=>
  {
    return (<Comment key={comment._id} comment={comment}/>)
  })}
    </Container>
    : <div><br/><Logintosee >Please log in to see comments, subscribe, and like videos...</Logintosee></div>
  );
}

export default Comments;
