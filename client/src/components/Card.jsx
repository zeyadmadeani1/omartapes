import React, { useEffect, useState } from "react";
import {Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js"
import { axiosInstance } from "../Config";
import "./card.css"
const Container = styled.div`
width:100%;
margin-top:2.5rem;
cursor: pointer;
`;

const Image = styled.img`

  height: ${(props) => (props.type === "sm" ? "120px" : "250px")};
  width:450px;
  background-color: #999;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  width: 100%;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`width:350px;`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type,video }) => {

const [user,setUser]=useState([])

 useEffect(()=>
 {

 const fetchVideos=async()=>
 { 
  const res=await axiosInstance.get(`/users/find/${video.userId}`)
 setUser(res.data)

 }
 fetchVideos()
 
 },[video.userId])

  return (

    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
    <Container className="change" type={type}>
      <Image
      className="imageonphone"
        type={type}
        src={video.imgUrl}
      />
      <Details type={type}>
        <ChannelImage
          type={type}
          src={user.Img? user.Img : "https://www.informatique-mania.com/wp-content/uploads/2021/04/foto-sin-rostro-de-facebook-780x470.jpg"}
        />
        <Texts className="imageonphoneedit">
          <Title>{video.Title}</Title>
          <ChannelName>{user.name}</ChannelName>
          <Info>{Math.round(video.views)} views • {format(video.createdAt)}</Info>
           </Texts>
      </Details>
    </Container>
  </Link>
  );
};

export default Card;
