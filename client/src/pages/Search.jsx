import { axiosInstance } from "../Config"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import Card from "../components/Card"
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom";
import "./Search.css"
import "./Home.css"
const Container = styled.div`
display: flex;
justify-content:space-around;
flex-wrap: wrap;
flex-direction:row;
min-height:100vh;
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
const CenterSubs=styled.h1
`
text-align:center;
display: flex;
align-items: center;
color:${props=>props.theme.text};

`
const General=styled.div``
const Search=({darkMode,setDarkMode})=>
{
    const [videos,setVideos]=useState([])
    const query=useLocation().search
    useEffect(()=>
    {
        const fetchVideos=async()=>
        {
const res=await axiosInstance.get(`/videos/search${query}`)
setVideos(res.data)
        }
        fetchVideos()
    },[query])
    return(<General className="changeOP">
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
      {videos.length<=0 ? <Container>
<CenterSubs>
  No Results Found.
</CenterSubs>
</Container>
:
<Container>
{ videos.map(vid=>
(
<Card key={vid._id} video={vid}/>
))}
  </Container>
}

      </General>)
}
export default Search
