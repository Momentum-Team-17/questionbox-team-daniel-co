
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.css'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { faUser, faLock, faAt } from "@fortawesome/free-solid-svg-icons"
import useLocalStorageState from 'use-local-storage-state'
import axios from 'axios'

export class Input {
  constructor(label, type, value, onChange, icon) {
    this.label = label
    this.type = type
    this.value = value
    this.onChange = onChange
    this.icon = icon
  }
}


export default function Header(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const URL = "https://questionbox-mgxz.onrender.com"
  
  const handleLogin = (e) => {
    setError(null)
    setSuccess(null)
    e.preventDefault()
    axios.post(`${URL}/auth/token/login/`, {
      "username": props.username,
      "password": password,
    }).then((res) => {
      console.log("success",res.data);
      props.setToken(res.data.auth_token)
      setSuccess(false)
      props.setIsLoginOpen(false)
    }).catch(function (error) {
      if (error.response) {
        setError(error.response.data);
        setSuccess(false)
      }
    })
  }

  const handleRegisterUser = (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    axios.post(`${URL}/auth/users/`, {
      "username": props.username,
      "password": password,
      "email": email,
    }).then((res) => {
      console.log("success",res.data.auth_token);
      props.setIsSignupOpen(false)
      props.setIsLoginOpen(true)
      setSuccess(true)
    }).catch(function (error) {
      if (error.response) {
        setError(error.response.data);
      }
    })
  }
  const handleLogout = (e) => {
    setError(null)
    setSuccess(null)
    e.preventDefault()
    console.log(props.token);

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${ props.token }`
      }

    axios.post(`${URL}/auth/users/me/`, { headers })
      .then((res) => {
      props.setToken(null)
      setSuccess(false)
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data);
        setSuccess(false)
      }
    })
  }
  
  const loginFields = {
    title: "Login",
    inputs: [new Input("Username", "text", props.username, props.setUsername, { faUser }),
      new Input("Password", "password", password, setPassword, { faLock })],
    onSubmit: handleLogin
  }

    const signupFields = {
    title: "Sign-up",
    inputs:
      [new Input("Email", "text", email, setEmail, { faAt }),
      new Input("Username", "text", props.username,  props.setUsername, { faUser }),
      new Input("Password", "password", password, setPassword, { faLock }),
      ],
    onSubmit: handleRegisterUser
  }

  return (
    <>
      <header className="bg-white">
        <nav className="mx-6 flex items-center justify-between py-6" aria-label="Global">
          <div className="flex sm:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 grow">
              <h1 className='title font-bold text-2xl'>
              <FontAwesomeIcon icon={faInbox} />
               &nbsp;QuestionBox</h1>
            </Link>
          </div>
          {props.token
            ? <>
              <div className="hidden sm:flex sm:flex-none sm:justify-end mx-4">
              <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
                Log Out <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
              <div className="hidden sm:flex sm:flex-none sm:justify-end">
                <Link to={ `/user/${props.username}`} className="rounded-md bg-black bg-opacity-30 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <FontAwesomeIcon icon={ faUser } />
                </Link>
              </div>
            </>
            
            :
            <><div className="hidden sm:flex sm:flex-none sm:justify-end mx-4">
              <button onClick={() => props.setIsLoginOpen(true)} className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
              <div className="hidden sm:flex sm:flex-none sm:justify-end">
                <button onClick={() => props.setIsSignupOpen(true)} className="rounded-md bg-black bg-opacity-30 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  Sign-Up <span aria-hidden="true"></span>
                </button>
              </div>
            </>}
        </nav>

      </header>
      <Modal fields={loginFields} isOpen={props.isLoginOpen} setIsOpen={props.setIsLoginOpen} error={ error } success = { success } />
      <Modal fields={signupFields} isOpen={props.isSignupOpen} setIsOpen={props.setIsSignupOpen} error={ error } success = { success }/>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export function Modal({fields, isOpen, setIsOpen, error, success}) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {fields.title}
                  </Dialog.Title>
                  {success && <h2 className="font-bold">User successfully created! Please login.</h2> }
                  <form onSubmit={ (e) => fields.onSubmit(e) }>
                    <div className="mt-2">
                      {fields.inputs.map((field) => {
                        return(<div class="mb-4">
                          <label key={field.label} class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            {field.label}
                          </label>
                          <input key={` ${field.label}inp `} required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={field.value} onChange={(e) => field.onChange(e.target.value)} id={`${field.label}-label`} type={ field.type } placeholder={field.label} />
                        </div>)
                      })}
                      {error && Object.keys(error).map((key) => {
                        return <h2 key={key}> <span className="capitalize font-bold">{key}: </span>{typeof(error[key]) === 'string' ? error[key] : error[key].join(' ')}</h2>
                      })}
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {fields.title}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}