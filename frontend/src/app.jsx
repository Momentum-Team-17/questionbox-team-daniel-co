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
import Page404 from './routes/404'



export default function App() {
  const [token, setToken] = useLocalStorageState('token')
  const [username, setUserName] = useState()
  const homeData = useRef()

  const URL = 'https://questionbox-mgxz.onrender.com'

  const setAuth = (token, username) => {
    setToken(token);
    setUserName(username);
  }

  const loadHome = async () => {
    const res = await axios.get(URL)
    return res
  }

  const loadQuestion = async ({ params }) => {
    const res = await axios.get(`${URL}/questions/${params.pk}`)
    return res
  }
  

  const loadUser = async ({params}) => {
    const res = await axios.get(`${URL}/auth/users/${params.username}`)
    return res
  }

  const router = createBrowserRouter(  
      createRoutesFromElements(
        <>
          <Route element={<Header token={token} username={username} errorElement={ Page404 } />}>
            <Route element={<HomePage token={token} />} path="/" loader={ loadHome } />
            <Route element={<QuestionPage token={token} />}loader={(params)=>loadQuestion(params)} path="/question/:pk" ErrorBoundary={ Page404 } /> //save yourself the API call and just filter to the pk of the main call as long as you have one ?? I think that makes sense
            <Route element={<UserPage token={token} username={username} />} loader={ (params) => loadUser(params)} ErrorBoundary={Page404} path="/user/:username" />
            <Route element={<LoginPage setAuth={ setAuth } />} path = "/login" />
            <Route element={<SignUpPage />} path="/sign-up" />
            <Route element={<Page404 />} path="/*" />
          </Route>
        </>
      )
    )
  
  return (
    <RouterProvider router={router} />
  )
}