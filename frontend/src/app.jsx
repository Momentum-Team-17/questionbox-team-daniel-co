import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import HomePage from './routes/home'
import LoginPage from './routes/login'
import SignUpPage from './routes/signup'
import UserPage from './routes/user'
import Header from './components/header'
import QuestionPage from './routes/question'
import useLocalStorageState from 'use-local-storage-state'
import axios from 'axios'



export default function App() {
  const [token, setToken] = useLocalStorageState('token')
  const [username, setUserName] = useState()
  const homeData = useRef()

  const URL = 'https://questionbox-mgxz.onrender.com/'

  const setAuth = (token, username) => {
    setToken(token);
    setUserName(username);
  }

  const loadHome = async () => {
    const res = await axios.get(URL)
    homeData.current = (res.data)

    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    return res
  }

  const loadQuestion = async ({params}) => {
    console.log(params.params.pk);
    if (homeData.current) {
      //console.log(homeData.results.filter((q) => q.pk === pk));
      return homeData.results.filter((q) => q.pk === pk)
    }
    
    const res = await axios.get(`${URL}questions/${params.params.pk}`)
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    return res
  }
  

  const loadUser = async (params) => {
    const res = await axios.get(`${URL}users/${params.username}`)
    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
    return res
  }

  const router = createBrowserRouter(  
      createRoutesFromElements(
        <>
          <Route element={<Header token={token} username={username} errorElement={ <><h1>Error!</h1><HomePage /></>} />}>
            <Route element={<HomePage token={token} />} path="/" loader={ loadHome } />
            <Route element={<QuestionPage token={token} />}loader={(params)=>loadQuestion({params})} path="/question/:pk" /> //save yourself the API call and just filter to the pk of the main call as long as you have one ?? I think that makes sense
            <Route element={<UserPage token={token} username={username} />} loader={ (params) => loadUser({params})} path="/user/:username" />
            <Route element={<LoginPage setAuth={ setAuth } />} path = "/login" />
            <Route element={<SignUpPage />} path="/sign-up" />
          </Route>
        </>
      )
    )
  
  return (
    <RouterProvider router={router} />
  )
}