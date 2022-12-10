import React from 'react'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../Config/Axios'
import {useNavigate} from 'react-router-dom';


const INITIAL_STATE = {
    userLogin: false,
    invalidCred: false,
    email: "",
    password: "",
    userData: []
}

export const loginUser = createAsyncThunk('login/loginUser', async ({email, password}) => {

    const response = await axios({
        method: "post",
        url: '/login',
        data: {
            email,
            password
        }
    })
    console.log(response, "response")
    return response
})


const loginReducer = createSlice({

    name: "login",
    initialState: INITIAL_STATE,
    reducers: {
        setUserName: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload[0]
        }
    },
    extraReducers: {
        [loginUser.pending]: () => {
            console.log('pensinf')
        },
        [loginUser.fulfilled]: (state, action) => {
            if (action.payload ?. data ?. login) {              
                localStorage.setItem("token", action.payload.data ?. token);
                localStorage.setItem("userData", JSON.stringify(action.payload.data ?. userData))
                state.userData = action.payload.data ?. userData[0];
                state.invalidCred = false
                state.userLogin = true
            } else {
                state.invalidCred = true
                state.userLogin = false
            }
        },
        [loginUser.rejected]: () => {
            console.log('rejected')
        }
    }
})

export const {setUserName, setPassword, setUserData} = loginReducer.actions
export default loginReducer.reducer
