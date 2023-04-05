import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Routes } from "react-router-dom"
import HomePage from './routes/home'
import LoginPage from './routes/login'
import SignUpPage from './routes/signup'
import UserPage from './routes/user'
import Header from './components/header'
import QuestionPage from './routes/question'
import useLocalStorageState from 'use-local-storage-state'
import axios from 'axios'
import Page404 from './routes/404'



export default function App() {
  const [token, setToken] = useLocalStorageState('token', { defaultValue:null})
  const [username, setUsername] = useLocalStorageState("username", { defaultValue:null})
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [reloader, setReloader] = useState(1)


  

  const setAuth = (token, username) => {
    setToken(token);
    setUsername(username);
  }

  return (
    <><Routes>
      <Route element={<Header token={token} username={username} setUsername={ setUsername } setToken={ setToken } errorElement={Page404}
          isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} isSignupOpen={isSignupOpen} setIsSignupOpen={setIsSignupOpen}/>}>
        <Route element={<HomePage token={token} setIsLoginOpen={setIsLoginOpen} key={reloader} setReloader={ setReloader } />} path="/" />
        <Route element={<QuestionPage key={reloader} token={token} setIsLoginOpen={setIsLoginOpen} setReloader={ setReloader } />} path="/question/:pk" /> 
          <Route element={<UserPage token={token} username={username} />} path="/user/:username" />
          {/* <Route element={<LoginPage setAuth={ setAuth } />} path = "/login" />
          <Route element={<SignUpPage />} path="/sign-up" /> */}
          <Route element={<Page404 />} path="/*" />
        </Route>
      </Routes></>
  )
}