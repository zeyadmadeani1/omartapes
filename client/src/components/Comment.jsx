import { axiosInstance } from "../Config";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  display:flex;
  align-items:center;
  justify-content:space-between;
`;
const Button=styled.button
`
width:70px;
height:30px;
border-radius:10px;
background-color:red;
color:#fff;
cursor:pointer;
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment}) => {
  const {currentUser}=useSelector(state=>state.user)
  const handleDelete=async(e)=>
  {
 
      await axiosInstance.delete(`/comments/${comment._id}`)
      window.location.reload()
  }
const [user,setUser]=useState([])
useEffect(()=>
{

  const fetchUser=async()=>
  {
    const res=await axiosInstance.get(`/users/find/${comment.userId}`)
    setUser(res.data)
  }

fetchUser()
},comment._id)
  return (
    <Container>
      <span style={{display:"flex",gap:12}}>
      <Avatar src={user.Img ?user.Img : "https://www.informatique-mania.com/wp-content/uploads/2021/04/foto-sin-rostro-de-facebook-780x470.jpg"}/>
      <Details>
        <Name>
         {user.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
{comment.desc}
        </Text>
      </Details>
      </span>

<Button style={{display:currentUser._id!==comment.userId && "none"}} onClick={handleDelete}>Delete</Button>
    </Container>
  );
};

export default Comment;
