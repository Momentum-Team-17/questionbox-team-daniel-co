import { Link, useLoaderData } from "react-router-dom";
import { Fragment } from 'react'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'

export default function HomePage() {
  const data = useLoaderData().data
  console.log(data)
  return (
  <>
      <PageHeader />
      <div className="mx-6 my-3 grid grid-cols-1 divide-y">
        {data.results.map((q) => <Question data={q} key={q.pk} />)}
      </div>
  </>

  )
}



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PageHeader() {
  //https://tailwindui.com/components/application-ui/headings/page-headings
  return (
  <div className="">
    <div className="p-6 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Questions
        </h2> 
        </div>
        
        <div className="mt-5 flex md:ml-4 md:mt-auto">
          <span className="hidden sm:block  mr-3">
            <button
              type="button"
              className="inline-flex border items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
              <FontAwesomeIcon icon={faQuestion} className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Unanswered
            </button>
          </span>
          <span className="hidden sm:block">
            <div className="flex">
              <div class="relative w-full">
                <input type="search" id="search-dropdown" className="w-64 block p-2 w-full z-20 text-sm font-semibold text-gray-900 bg-white rounded-lg border box-border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white " placeholder="Search questions" required />
                <button type="submit" className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-indigo-600 rounded-r-lg border box-border border-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                    <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span class="sr-only">Search</span>
                </button>
              </div>
            </div>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <FontAwesomeIcon icon={faPlus} className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Question
            </button>
          </span>

          {/* Dropdown */}
          <div className="relative sm:hidden">

          </div>
          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border border-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      Unanswered
                    </Link>        
                  )}
                </Menu.Item>
                <Menu.Item><>
                <div className="flex">
                  <div class="relative w-full">
                    <input type="search" id="search-dropdown" className=" block p-2 w-full z-20 text-sm font-semibold text-gray-900 bg-white rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white " placeholder="Search questions" required />
                    <button type="submit" className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-indigo-600 rounded-r-lg  border-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                        <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span class="sr-only">Search</span>
                    </button>
                  </div>
                </div></>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}

function Question({ data }) {
  console.log(data);
  return (
    <div>
      <h3 className="mt-1"><Link to={`/question/${data.pk}`} className="text-lg font-bold text-violet-800 dark:text-violet-500 hover:underline">{ data.title }</Link></h3>
      <p className="text-sm"><Link to={`/user/${data.author}`} className="mt-1 mb-1 font-medium text-violet-600 dark:text-violet-300 hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()}</p>
      <p className="text-md mt-1 mb-3">{ data.text }</p>
    </div>
  )
}


