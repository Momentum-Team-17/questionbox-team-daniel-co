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




export default function App() {
  const [token, setToken] = useLocalStorageState('token')
  const [userName, setUserName] = useState()

  const setAuth = (token, userName) => {
    setToken(token);
    setUserName(userName);
  }

  const router = createBrowserRouter(  
      createRoutesFromElements(
        <>
          <Route element={<Header token={token} />}>
            <Route element={<HomePage token={token} />} path="/" loader={ () => true } />
            <Route element={<LoginPage setAuth={ setAuth } />} path = "/login" />
            <Route element={<SignUpPage />} path="/sign-up" />
            <Route element={<QuestionPage token={token} />} path="/question/:pk" />
            <Route element={<UserPage token={token} />} path="/user/:username" />
          </Route>
        </>
      )
    )
  
  return (
    <RouterProvider router={router} />
  )
}