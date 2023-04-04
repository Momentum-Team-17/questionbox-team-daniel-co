import { Link, useLoaderData } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'
import axios from "axios";

export default function HomePage(props) {
    const [data, setData] = useState()
  
  useEffect( () => {
    const URL = 'https://questionbox-mgxz.onrender.com'
    axios.get(URL).then((res) => {
      setData(res.data)
    })

  },[])

  if (data) return (
  <>
      <PageHeader />
      <button onClick={() => { props.setToken((setToken) => { setToken + 1 }) }}>hi</button>
      <div className="mx-6 my-3 grid grid-cols-1 divide-y">
        {data.results.map((q) => <Question data={q} key={q.pk} />)}
      </div>
  </>

  )
}


function PageHeader() {
  //https://tailwindui.com/components/application-ui/headings/page-headings
  return (
  <div className="">
    <div className="p-6 flex items-center justify-between">
      <div className=" min-w-0 flex-none">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          
        </h2> 
          <span className="block  mr-3">
            <button
              type="button"
              className="inline-flex border items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
              <FontAwesomeIcon icon={faQuestion} className="-ml-0.5 mr-1.5" aria-hidden="true" />
              Unanswered
            </button>
          </span>
        </div>
        
        <div className="flex flex-auto items-center justify-end ml-4 mt-auto">
          <span className="flex-auto flex justify-end">
              <div className="relative">
                <input type="" id="search-dropdown" className=" block p-2 w-5/6 z-20 text-sm font-semibold text-gray-900 bg-white rounded-lg border box-border border-gray-30 " placeholder="Search" sm:placeholder="Search questions" required />
                <button type="submit" className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-indigo-600 rounded-r-lg border box-border border-indigo-700 hover:bg-indigo-500 focus:outline-none focus:ring-blue-300  ">
                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
              </div>

          </span>

          <span className="ml-3 flex-none">
            <button
              type="button"
              className="inline-flex items-center rounded-md border bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <FontAwesomeIcon icon={faPlus} className="-ml-0.5  h-5 w-5" aria-hidden="true" />
              <span className="ml-1.5 hidden sm:inline">New Question</span>
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

function Question({ data }) {
  
  const pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

  return (
    <div>
      <h3 className="mt-1"><Link to={`/question/${data.pk}`} className="text-lg font-bold text-violet-800  hover:underline">{ data.title }</Link></h3>
      <p className="text-sm"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600  hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()} - {pluralize(data.answers.length, "answer")}</p>
      <p className="text-md my-1">{ data.text }</p>
      <p className="text-sm mb-3"><Link to={`/questions/${data.pk}`} className="mt-1 mb-1 font-medium text-violet-600 hover:underline"></Link></p>
    </div>
  )
}


