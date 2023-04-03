
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.css'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { faUser, faLock, faAt } from "@fortawesome/free-solid-svg-icons"
import useLocalStorageState from 'use-local-storage-state'

class Input {
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

  console.log(props)
  const handleLogin = (e) => {
    e.preventDefault()
  }

  const handleRegisterUser = (e) => {
    e.preventDefault()
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
      new Input("Username", "text", props.userName,  props.setUserName, { faUser }),
      new Input("Password", "password", password, setPassword, { faLock }),
      ],
    onSubmit: handleRegisterUser
  }




  return (
    <>
      <header className="bg-white">
        <nav className="mx-6 flex items-center justify-between py-6" aria-label="Global">
          <div className="flex sm:flex-1">
            <a href="/" className="-m-1.5 p-1.5 grow">
              <h1 className='title font-bold text-2xl'>
              <FontAwesomeIcon icon={faInbox} />
               &nbsp;QuestionBox</h1>
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-none sm:justify-end mx-4">
            <button onClick={() => props.setIsLoginOpen(true)} className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
                    <div className="hidden sm:flex sm:flex-none sm:justify-end">
            <button onClick={() => props.setIsSignupOpen(true)} className="rounded-md bg-black bg-opacity-30 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Sign-Up <span aria-hidden="true"></span>
            </button>
          </div>
        </nav>

      </header>
      <Modal fields={loginFields} isOpen={props.isLoginOpen} setIsOpen={props.setIsLoginOpen} />
      <Modal fields={signupFields} isOpen={props.isSignupOpen} setIsOpen={props.setIsSignupOpen} />
      <main>
        {/* <Outlet /> */}
      </main>
    </>
  )
}

export function Modal({fields, isOpen, setIsOpen}) {
  console.log(fields);
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
                  <form onSubmit={ (e) => fields.onSubmit(e) }>
                    <div className="mt-2">
                      {fields.inputs.map((field) => {
                        // console.log(field);
                        return(<div class="mb-4">
                          <label key={field.label} class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            {field.label}
                          </label>
                          <input key={ field.label } required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={field.value} onChange={(e) => field.onChange(e.target.value)} id={`${field.label}-label`} type={ field.type } placeholder={field.label} />
                        </div>)
                      })}
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        // onClick={() => setIsOpen(false)}
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