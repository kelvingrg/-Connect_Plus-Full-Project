import React from 'react'
import {configureStore} from '@reduxjs/toolkit';
import modalReducer from "./ModalSlice"
import postTypeReducer from './PostTypeReducer';
import loginReducer from './LoginReducer';
import tempDataReducer from './TempDataReducer'

// to persist state (store is protected from refresh )
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist" 
import { combineReducers } from '@reduxjs/toolkit';


const persistConfig={
    key:"root",
    version:1,
    storage
}
const reducer=combineReducers({
    modal: modalReducer,
    postType: postTypeReducer,
    login: loginReducer,
    tempData:tempDataReducer,
})

const persistedReducer=persistReducer(persistConfig,reducer)

export const store = configureStore({

    reducer: persistedReducer
        
    
});
