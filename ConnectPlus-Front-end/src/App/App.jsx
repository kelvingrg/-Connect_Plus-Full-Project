import { parse } from "postcss";
import React, { useEffect } from "react";
import { json, Route,Routes} from  'react-router-dom'
import Auth from "../Auth/Auth";
import Page404 from "../Pages/404Page/Page404";
import ChatPage from "../Pages/ChatPage/ChatPage";
import Connections from "../Pages/Connections/Connections";
import DetailedJobPostView from "../Pages/DetailedJobPostView/DetailedJobPostView";
import HomePage from "../Pages/HomePage/HomePage";
import Job from "../Pages/Job/Job";
import JobPost from "../Pages/JobPost/JobPost";

import { LandingPage } from "../Pages/LandingPage/LandingPage";
import NewChat from "../Pages/NewChat/NewChat";
import Notification from "../Pages/Notification/Notification";
import Profile from "../Pages/Profile/Profile";
import UserProfileViewByOthersPage from "../Pages/UserProfileViewByOthersPage/UserProfileViewByOthersPage";
import Authorisation from "./Authorisation";
import LoginAuthorisation from "./LoginAuthorisation";






function App() {

  return (

<Routes>
    <Route path='/page404' element={<Page404/>}/>
<Route element={<LoginAuthorisation/>}>
    <Route path='/' element={<LandingPage/>}/>
</Route>  
     <Route element={<Authorisation/>}>
          
<Route  path="/home" element={<HomePage/>}  />  
<Route  path="/profile" element={<Profile/>}  />  
<Route  path="/job" element={<Job/>}  /> 
<Route  path="/jobPosts" element={<JobPost/>}  /> 

<Route  path="/detailedJobPostView/:id" element={<DetailedJobPostView/>}  /> 
<Route  path="/UserProfileViewByOthersPage/:id" element={<UserProfileViewByOthersPage/>}  /> 
<Route  path="/connectionDetails" element={<Connections/>}  /> 
<Route  path="/chat" element={<ChatPage/>}  /> 
<Route  path="/newchat" element={<NewChat/>}  /> 
<Route  path="/notification" element={<Notification/>}  /> 
  
  </Route>
         
</Routes>
  



  );          
}

export default App;
