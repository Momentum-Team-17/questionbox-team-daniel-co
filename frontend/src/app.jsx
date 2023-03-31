import React, { useState } from 'react'
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
  const [homeData, setHomeData] = useState()

  const URL = 'https://questionbox-mgxz.onrender.com/'

  const setAuth = (token, username) => {
    setToken(token);
    setUserName(username);
  }

  loadHome = () => {
    axios.get(URL)
      .then((response) => {
        setHomeData(response.data)
        return response.data
      })
  }

  loadQuestion = (pk) => {
    if (homeData) {
      return homeData.filter((q) => q.pk === pk)
    } else {
      axios.get(`${URL}/question/${pk}`)
        .then((response) => {
          return response.data
        })
    }
  }

  loadUser = (username) => {
    axios.get(`${URL}/user/${username}`)
      .then((response) => {
        return response.data
      })
  }

  const router = createBrowserRouter(  
      createRoutesFromElements(
        <>
          <Route element={<Header token={token} username={ username } />}>
            <Route element={<HomePage token={token} />} path="/" loader={ loadHome } />
            <Route element={<QuestionPage token={token} loader={(pk) => loadQuestion({ pk })} />} path="/question/:pk" /> //save yourself the API call and just filter to the pk of the main call as long as you have one ?? I think that makes sense
            <Route element={<UserPage token={token} username={username} loader={ (username) => loadUser({username})} />} path="/user/:username" />
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