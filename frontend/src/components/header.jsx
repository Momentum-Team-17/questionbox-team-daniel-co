
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMessageQuestion } from '@fortawesome/free-solid-svg-icons'
import './styles/header.css'
export default function Header() {

  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="" className="-m-1.5 p-1.5">
              <FontAwesomeIcon icon={faMessageQuestion} />
              <h1 className='title'>QuestionBox</h1>
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