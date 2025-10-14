import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import {persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice'
import employeeReducer from './slices/employeeSlice'



const rootReducer = combineReducers({
    user : userReducer,
    employee : employeeReducer



})
const persistConfig ={key:"root",storage,version:1}
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({reducer:persistedReducer})
export const persistor = persistStore(store)