
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.css'
import { Link, Outlet } from 'react-router-dom'
export default function Header() {

  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex sm:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 grow">
              <h1 className='title font-semibold'>
              <FontAwesomeIcon icon={faInbox} />
               &nbsp;QuestionBox</h1>
            </Link>
          </div>
          <div className="hidden sm:flex sm:flex-none sm:justify-end mx-4">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
                    <div className="hidden sm:flex sm:flex-none sm:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
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