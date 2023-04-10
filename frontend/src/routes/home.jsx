import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestion, faUser, faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'
import axios from "axios";
import { Input } from "../components/header";
import { Dialog } from '@headlessui/react'
import Loader from '../components/loader'
import FavButton from "../components/favbutton";

export default function HomePage(props) {
  const [data, setData] = useState()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [error, setError] = useState(false)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState('unanswered')
  const navigate = useNavigate()
  const URL = 'https://questionbox-mgxz.onrender.com'


  useEffect(() => {

    axios.get(`${URL}/questions/${filter}`,
    {
      headers: props.token && {
        'Content-Type': 'application/json',
        Authorization: `Token ${props.token}`
      }}).then((res) => {
        setData(res.data)
        console.log(res.data);
    })

  }, [filter])

  const createFields = {
    title: "New Question",
    inputs: [new Input("Title", "text", title, setTitle, null),
            new Input("Text", "text", text, setText, null)],
    onSubmit: handleNewQuestion
  }

  function handleNewQuestion(e){
    setError(null)
    e.preventDefault() 

    axios.post(`${URL}/`,
      {
        "title": title,
        "text":text
      },
      { headers : {
        'Content-Type': 'application/json',
        Authorization: `Token ${ props.token }`
      } })
      .then((res) => {
        props.setReloader(Math.random())
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          setError(error.response.data);
        }
      })
  }

  const handleSearch = () => {
    let authT = null
    if (props.token) {
      authT = {headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${props.token}`
      }}
    }

    axios.get(`${URL}/search?q=${search}`,
    {
      authT
    }).then((res) => {
      setData(res.data)
    })
  }

  if (data) return (
  <>
      <PageHeader filter={filter} setFilter={setFilter} token={props.token} handleSearch={handleSearch} setIsCreateOpen={setIsCreateOpen} setIsLoginOpen={props.setIsLoginOpen} search={search} setSearch={ setSearch }/>
      {data.results.length ?
        <div className="mx-6 my-3 grid grid-cols-1 divide-y">
          {data.results.map((q) => <Question data={q} token={props.token} setReloader={props.setReloader}  key={q.pk}  />)}
        </div> :
        <div className="h-96 flex items-center justify-center"><h1 className="text-2xl">No results</h1></div>
      }
      <Modal fields={createFields} isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} error={ error } />
  </>

  )
  return <Loader/>
}


function PageHeader({ filter, setFilter, token, setIsCreateOpen, setIsLoginOpen, search, setSearch, handleSearch }) {
  //https://tailwindui.com/components/application-ui/headings/page-headings
  return (
  <div className="">
    <div className="p-6 flex items-center justify-between">
      <div className=" min-w-0 flex-none">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          
        </h2> 
          <span className="block  mr-3">
            <button onClick={() => setFilter(filter === "answered" ? "unanswered" : "answered")}
              type="button"
              className="inline-flex border items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
              <FontAwesomeIcon icon={filter === "unanswered"? faQuestion : faCheck} className="-ml-0.5 mr-1.5" aria-hidden="true" />
              {filter.charAt(0).toUpperCase() + filter.substring(1) }
            </button>
          </span>
        </div>
        
        <div className="flex flex-auto items-center justify-end ml-4 mt-auto">
          <span className="flex-auto flex justify-end">
              <div className="relative">
                <input value={search} onChange={(e) => setSearch(e.target.value)} 
                type="search" id="search-dropdown"
                className=" block p-2 w-5/6 z-20 text-sm font-semibold text-gray-900 bg-white rounded-lg border box-border border-gray-30 "
                placeholder="Search" sm:placeholder="Search questions" required />
                <button onClick={handleSearch} className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-indigo-600 rounded-r-lg border box-border border-indigo-700 hover:bg-indigo-500 focus:outline-none focus:ring-blue-300  ">
                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
              </div>

          </span>

          <span className="ml-3 flex-none">
            <button onClick={token? ()=>setIsCreateOpen(true) : ()=>setIsLoginOpen(true)}
              type="button"
              className="inline-flex items-center rounded-md border bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border box-border border-indigo-700"
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

function Question({ data, token, setReloader }) {
  
  const pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

  return (
    <div>
      <h3 className="mt-1">
        {token && <FavButton token={token} data={data} setReloader={setReloader} />}
        <Link to={`/question/${data.pk}`} className="text-lg font-bold text-violet-800  hover:underline">{data.title}</Link></h3>
      <p className="text-sm"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600  hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()} - {pluralize(data.answers.length, "answer")}</p>
      <p className="text-md my-1">{ data.text }</p>
      <p className="text-sm mb-3"><Link to={`/questions/${data.pk}`} className="mt-1 mb-1 font-medium text-violet-600 hover:underline"></Link></p>
    </div>
  )
}





function Modal({fields, isOpen, setIsOpen, error}) {
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
                        return (<div class="mb-4" key={` ${field.label}div `}>
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
                        Post
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