import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { axiosInstance } from "../Config";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
const Container = styled.div`
  display: flex;
  justify-content:space-around;
  flex-wrap: wrap;
  flex-direction:row;
  min-height:100vh;
`;
const Scroll=styled.div
`

`
const General=styled.div``
const CenterSubs=styled.h1
`
text-align:center;
display: flex;
align-items: center;
color:${props=>props.theme.text};

`
const Light=styled.a
`
color:${props=>props.theme.text};
cursor:pointer`
const Home = ({type,setDarkMode,darkMode}) => {
  const [user,setUser]=useState({})
  const [videos, setVideos] = useState([]);
  const {currentUser}=useSelector(state=>state.user)
  const [subVideos,setSubVideos]=useState([])
  const dispatch=useDispatch()

  useEffect(()=>
  {
    if(type==="sub")
    {
      const fetchsubVideos=async()=>
      {
        if(currentUser)
        {
          const res=await axiosInstance.get(`/videos/sub/`)
          setSubVideos(res.data)
        }

      }
      fetchsubVideos()
    }

  },[type])
  useEffect(()=>
  {
    if(currentUser)
    {
      const getuser=async()=>
      {
        const res=await axiosInstance.get(`/users/find/${currentUser._id}`)
        setUser(res.data)
      }
      getuser()
    }


  },[])
  useEffect(() => {
    {
      if(type!=="sub")
      {
        const fetchVideos = async () => {  const res=await axiosInstance.get(`/videos/${type}`)
        setVideos(res.data);
      }
      fetchVideos();
    }
     };
   }, [type]);
  return (
    <General className="changeOP">

    <Container type={videos.length} className="homeContainer">
      <Scroll style={{display:"none"}} className="scrollmenu">
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
</Scroll>
{
type==="trend" || type==="random"?
     videos.map(vid=>
        (
          <Card className="card" key={vid._id} video={vid} />
        ))
  
: !currentUser && type==="sub" ? <CenterSubs>Please log in to use this feature</CenterSubs>
: currentUser && type==="sub" && currentUser.subscribedUsers.length<=0 || currentUser.subscribedUsers.every(user=>user==="undefined")? <CenterSubs>Please Subscribe to new channels to see them here.</CenterSubs>:
 subVideos.map(vid=>
  (
    <Card key={vid._id} video={vid} type={type}/>
  ))
  }
</Container>    </General>
        );
      }



export default Home;
