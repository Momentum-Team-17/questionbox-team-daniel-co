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
  const [token, setToken] = useState(1)
  const [username, setUsername] = useState("chris")
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)


  

  const setAuth = (token, username) => {
    setToken(token);
    setUserName(username);
  }



  const loadUser = async ({ params }) => {
    const URL = 'https://questionbox-mgxz.onrender.com'
    const res = await axios.get(`${URL}/auth/users/${params.username}`)
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    return res
  }

  // const router = createBrowserRouter(  
  //     createRoutesFromElements(
  //       <>

  //           <Route element={<HomePage setToken={setToken} />} path="/" loader={ loadHome } />
  //           <Route element={<QuestionPage token={token} />}loader={(params)=>loadQuestion(params)} path="/question/:pk" /> 
  //           <Route element={<UserPage token={token} username={username} />} loader={ (params) => loadUser(params)} path="/user/:username" />
  //           <Route element={<LoginPage setAuth={ setAuth } />} path = "/login" />
  //           <Route element={<SignUpPage />} path="/sign-up" />
  //           <Route element={<Page404 />} path="/*" />

  //       </>
  //     )
  //   )
  
  return (
    <><Routes>
        <Route element={<Header token={token} username={username} setUsername={ setUsername } errorElement={Page404} setAuth={setAuth}
          isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} isSignupOpen={isSignupOpen} setIsSignupOpen={setIsSignupOpen}/>}>
          <Route element={<HomePage setToken={setToken} />} path="/" />
          <Route element={<QuestionPage token={token} />} path="/question/:pk" /> 
          <Route element={<UserPage token={token} username={username} />} path="/user/:username" />
          <Route element={<LoginPage setAuth={ setAuth } />} path = "/login" />
          <Route element={<SignUpPage />} path="/sign-up" />
          <Route element={<Page404 />} path="/*" />
        </Route>
      </Routes></>
  )
}