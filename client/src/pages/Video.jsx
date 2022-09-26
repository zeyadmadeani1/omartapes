import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams,Link } from "react-router-dom";
import { axiosInstance } from "../Config";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import ClearIcon from '@mui/icons-material/Clear';
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import "./video.css"
import "./Home.css"
const Container = styled.div`
  display: flex;
  gap: 24px;
  min-height:100vh;
`;

const Content = styled.div`
  flex: 5;

`;
const Light=styled.a
`
color:${props=>props.theme.text};
cursor:pointer`
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  align-items:"center";
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
const General=styled.div``
const Video = ({darkMode,setDarkMode}) => {
const path=useParams()
const {currentVideo}=useSelector(state=>state.video)
const {currentUser}=useSelector(state=>state.user)
const[user,setUser]=useState({})
const navigate=useNavigate()
const dispatch=useDispatch()



useEffect(()=>
{

    const updateViews=async()=>
    {
        await axiosInstance.put(`/videos/view/${currentVideo._id}`)
    }
    updateViews()
  
},[path.id])

useEffect(()=>
{

  const fetchdata=async()=>
  {


        const res=await axiosInstance.get(`/videos/find/${path.id}`)
        dispatch(fetchSuccess(res.data))
        const userRes=await axiosInstance.get(`/users/find/${res.data.userId}`)
        setUser(userRes.data)
}
fetchdata()
},[dispatch])
 
const handleLike=async()=>
{
  if(currentVideo && currentUser)
{
  await axiosInstance.put(`/users/like/${currentVideo._id}`)
  dispatch(like(currentUser._id))

}

}
const handleDelete=async()=>
{
  {
    if(currentVideo && currentUser)
{
  const res=await axiosInstance.delete(`/videos/${currentVideo._id}`)
  res.status===200 && navigate("/")
}

  }

}

const handleDislike=async()=>
{
  if(currentVideo && currentUser)
  {
    await axiosInstance.put(`/users/dislike/${currentVideo._id}`)
  dispatch(dislike(currentUser._id))

  }

}
const handleSubsription=async()=>
{
  try
  {

    if(currentVideo && currentUser)
    {
    if( currentUser.subscribedUsers.includes(user._id))
    {
    await axiosInstance.put(`/users/unsub/${user._id}`)
    }
      else
    {
      await axiosInstance.put(`/users/sub/${user._id}`)
    
    }
    dispatch(subscription(user._id))
    }
  }
  catch(e)
  {
throw e
  }

}
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
<Container className="movedownaBIT">

<Content>

{currentVideo && <VideoWrapper>

<VideoFrame
controls
src={currentVideo.videoUrl}
poster={currentVideo.imgUrl}
/>
</VideoWrapper>}
  {currentVideo &&   <Title>
{currentVideo.Title}
  </Title>}
{currentVideo && 
  <Details className="Det">
  <Info>
{Math.round(currentVideo.views)} views • Posted {format(currentVideo.createdAt)}
  </Info>
  <Buttons>
    {
      currentUser  && <Button onClick={handleLike}>
      <ThumbUpIcon /> {currentVideo.likes.length} 	&nbsp;    
  </Button>
    }
{
currentUser && <Button onClick={handleDislike}>
<ThumbDownOffAltOutlinedIcon />{currentVideo.dislikes.length} 	&nbsp;
</Button>
}

    {
      currentUser && currentVideo &&  currentUser._id===currentVideo.userId &&   <Button onClick={handleDelete}>
      <ClearIcon /> Delete Video
    </Button>
    }
</Buttons>
</Details>
}

  <Hr />
  <Channel>
    {currentVideo && 
        <ChannelInfo>    
        <Image src={user.Img? user.Img : "https://www.informatique-mania.com/wp-content/uploads/2021/04/foto-sin-rostro-de-facebook-780x470.jpg"}/>
        <ChannelDetail >
          <ChannelName>{user.name}</ChannelName>
          <ChannelCounter>{user.subscribers} Subscribers</ChannelCounter>
          <Description>
            {currentVideo.desc}
          </Description>
        </ChannelDetail>
      </ChannelInfo>
    }

    {
      currentUser && <Subscribe className="sub" onClick={handleSubsription}>
      {currentUser.subscribedUsers.includes(user._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
                </Subscribe>
    }

  </Channel>
  <Hr />
  {
    
    currentVideo && <Comments videoId={currentVideo._id} />
    
  }

</Content>
</Container>
    </General>
  );
};

export default Video;
