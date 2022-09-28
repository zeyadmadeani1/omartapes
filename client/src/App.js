import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video"
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "./pages/UpdateProfile";
import Report from "./pages/Report";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Reset from "./pages/Reset";
import {v4 as uuid} from "uuid"
import ResetPassword from "./pages/ResetPassword";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  width:100%;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 30px;
`;
console.clear()
function App() {
  const dispatch=useDispatch()
  const [darkMode, setDarkMode] = useState(true);
  const {currentUser}=useSelector(state=>state.user)
  return (
 <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

         <Container>
        <BrowserRouter>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
            <Routes>
            <Route  path="/">
                  <Route index element={currentUser? <Home darkMode={darkMode} setDarkMode={setDarkMode} type="random"/> : <SignIn darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="trends" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} type="trend"/>} />
                  <Route path="reset" element={<Reset darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="987739280-0329873280-KJFHKlnhdkujospk-2317Y6U32179808/:token" element={<ResetPassword darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="subscriptions" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} type="sub"/>} />
                  <Route path="search" element={<Search darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="signin" element={currentUser ? <Home darkMode={darkMode} setDarkMode={setDarkMode} type="random" /> :<SignIn darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="updateprofile" element={<UpdateProfile darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="report" element={<Report darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="help" element={<Report darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="signup" element={<Signup darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="video">
                  <Route path=":id" element={<Video darkMode={darkMode} setDarkMode={setDarkMode}/> } />
                  </Route>
                </Route>
              </Routes>
              </Wrapper>
          </Main> 
        </BrowserRouter>

      </Container>

    </ThemeProvider>

  );
}

export default App;
