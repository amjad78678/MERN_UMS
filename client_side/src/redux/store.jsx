import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
import { apiSlice } from './apiSlice';
import adminAuthSlice from './adminAuthSlice';

const store = configureStore({
    reducer:{
        auth:authSlice,
        adminAuth:adminAuthSlice,
       [apiSlice.reducerPath]:apiSlice.reducer

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;