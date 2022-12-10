import React from 'react'
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE={
    videoPost:false,
    imagePost:false,
    jobPost:false
    
 } ;


 const postTypeReducer=createSlice({
    name:"postType",
    initialState:INITIAL_STATE,
    reducers:{
        setVideoPost:(state,action)=>{
            state.videoPost=!state.videoPost
            state.jobPost=false },
        setImagePost:(state,action)=>{state.imagePost=!state.imagePost},
        setJobPost:(state,action)=>{
            state.videoPost=!action.payload
            state.imagePost=!action.payload
            state.jobPost=action.payload
        
        },
    }
})
export const {setVideoPost,setImagePost,setJobPost}=postTypeReducer.actions
export default postTypeReducer.reducer