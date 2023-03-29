import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import HomePage from './routes/home'
import LoginPage from './routes/login'
import SignUpPage from './routes/signup'
import UserPage from './routes/user'
import Header from './components/header'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element = {<Header />}>
        <Route element={<HomePage />} path="/" loader={ () => true } />
        <Route element = {<LoginPage />} path = "/login" />
        <Route element={<SignUpPage />} path="/sign-up" />
        <Route element={<QuestionPage />} path="/question/:pk" />
        <Route element={<UserPage />} path="/user/:pk" />
        <Route element={<UserPage />} path="/profile" />
      </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
