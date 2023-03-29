import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"

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
