
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.css'
import { Outlet } from 'react-router-dom'
export default function Header() {

  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="" className="-m-1.5 p-1.5">
              <h1 className='title'>
              <FontAwesomeIcon icon={faInbox} />
               &nbsp;QuestionBox</h1>
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-xl font-semibold leading-6 text-gray-900">
              Sign-Up <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>

      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}