import { faArrowRight, faCaretLeft, faCaretRight, faCheck, faHeart, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import moment from "moment"
import { useState, useEffect } from "react"
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Input } from "../components/header";

export default function QuestionPage({ token, setIsLoginOpen }) {
  const [data, setData] = useState()
  const [isCreateAnswerOpen, setIsCreateAnswerOpen] = useState(false)
  const [answer, setAnswer] = useState()
  const [error, setError] = useState()
  const { pk } = useParams()
  

  useEffect( () => {
    const URL = 'https://questionbox-mgxz.onrender.com'
    axios.get(`${URL}/questions/${pk}`).then((res) => {
      setData(res.data)
    })

  }, [])
  
  const handleNewAnswer = (e) => {
    
  }
  
  const createFields = {
    title: "New Answer",
    inputs: [new Input("Answer", "text", answer, setAnswer, null),],
    onSubmit: handleNewAnswer
  }
  
  if (data) {
    console.log(data);
    return (
      <>
        <PageHeader data={data} />
        <div className="mx-6 grid grid-cols-1 divide-y">
          {<Question data={data} />}
          {/* {data.isAccepted && <AcceptedAnswer />} */}
          {/* {post new answers if logged in } */}
          <div>
            <div className="flex justify-between items-center my-2">
              <h3 className="text-xl font-bold mt-3">Answers</h3>
              <button onClick={() => { token ? setIsCreateAnswerOpen(true) : setIsLoginOpen(true)}} type="button" className="inline-flex items-center rounded-md border bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                New Answer
              </button>
            </div>
            {data.answers.length? 
              data.answers.map((a) => <Answer key={a.pk} data={a} />) :
              <div className="h-96 flex items-center justify-center"><h1 className="h-64 text-2xl text-center font-bold text-gray-500">No answers!<br />...Yet</h1></div>}
          </div>
        </div>
         <Modal fields={createFields} isOpen={isCreateAnswerOpen} setIsOpen={setIsCreateAnswerOpen} error={ error } />
      </>

    )
  }

}

function PageHeader({data}) {
  //https://tailwindui.com/components/application-ui/headings/page-headings
  const navigate = useNavigate()

  const handleNext = () => navigate(`/question/${data.pk + 1}`)
  const handleBack = () => navigate(`/question/${data.pk - 1}`)

  return (
    <div className="">
      <div className="mx-6 mt-6 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:tracking-tight">
            {data.title}
          </h2>
        </div>
        
        <div className="flex">
          {data.pk > 1 && <span className=" mr-1">
            <button
              onClick={handleBack}
              type="button"
              className="inline-flex border items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
              <FontAwesomeIcon icon={faCaretLeft} className="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
              Previous
            </button>
          </span>}
          {/* conditionally render if not no next */}
          {true && <span className="">
            <button
              onClick={handleNext}
              type="button"
              className="inline-flex items-center rounded-md border bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Next
              <FontAwesomeIcon icon={faCaretRight} className="ml-1 mr-0 h-5 w-5" aria-hidden="true" />
            </button>
          </span>}
        </div>
      </div>
    </div>
  )
}

function Question({data}) {
  return (
    <div className="">
      <div className="min-w-0 flex-1">
        <p className="text-sm mt-1"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600 dark:text-violet-300 hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()} - {pluralize(data.answers.length, "answer")}</p>
        <p className="text-md mt-1 mb-6">{ data.text }</p>
      </div>
    </div>  
  )
}


function Answer({ data }) {
  const handleAccept = () => {}
  const handleFavorite = () => { }
  
  return (
     <div className="flex items-top justify-between">
      <div className="mr-2 mt-1 flex flex-col align-top">
        {/* show if logged in user = user */}
        <button
          onClick={handleAccept}
          type="button"
          className="inline-flex items-center rounded-md border bg-indigo-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FontAwesomeIcon icon={faCheck} className="" aria-hidden="true" />
        </button>
        
        <button
          onClick={handleFavorite}
          type="button"
          className="inline-flex items-center rounded-md border bg-indigo-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {/* Make red if favorited */}
          <FontAwesomeIcon icon={faHeart} className="" aria-hidden="true" />
        </button>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm mt-1"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600 dark:text-violet-300 hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()}</p>
        <p className="text-md mt-1 mb-6">{ data.text }</p>
      </div>
    </div>  
    // select best answer and heart
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


const pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;


