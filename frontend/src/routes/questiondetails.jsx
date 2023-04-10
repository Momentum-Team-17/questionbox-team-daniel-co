import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import moment from "moment"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from '../components/loader'
import { Tooltip } from "@material-tailwind/react";
import Question from '../components/question'
import Answer from "../components/answer"
import AcceptButton from "../components/acceptbutton"
import FavButton from "../components/favbutton"
/* TODO:
  Add heart for question (necessary)

  Spicy:
    Make hearts red if fave (backend too)
    Edit questions
  */

export default function QuestionPage({ token, setIsLoginOpen, setReloader, username}) {
  const [data, setData] = useState()
  const [answerText, setAnswerText] = useState()
  const userIsAuthor = useRef()
  const { pk } = useParams()

  

  useEffect( () => {
    const URL = 'https://questionbox-mgxz.onrender.com'
    let authT = null
    if (token) {
      authT = {headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }}
    }

    axios.get(`${URL}/questions/${pk}`,
    {
      authT
      }).then((res) => {
      userIsAuthor.current = username === res.data.author
      setData(res.data)
    })

  }, [])
  
  const handleNewAnswer = (e) => {
    e.preventDefault() 
    
    if (token) { 
      const URL = 'https://questionbox-mgxz.onrender.com'
      axios.post(`${URL}/questions/${data.pk}/answers`,
        {
          "text": answerText,
        },
        { headers : {
          'Content-Type': 'application/json',
          Authorization: `Token ${ token }`
        } })
        .then((res) => {
          setReloader(Math.random())
        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        })
    } else {
      setIsLoginOpen(true)
    }

  }
  
  if (data) {
    return (
      <>
        <div className="mx-6 flex items-center justify-start space-x-2">
          {token && <FavButton token={token} data={data} setReloader={setReloader}/>}
          <QuestionTitle data={data} />
        </div>
        <div className="mx-6 grid grid-cols-1 divide-y">
          <Question data={data} />

          {data.accepted_answer && <AcceptedAnswer  data={data.accepted_answer}  token={token}  setReloader={setReloader} />}
          {/* component this out */}
          <form className="mb-2" onSubmit={(e) => handleNewAnswer(e)}>
            <div className="flex justify-between items-center my-2">
              <h3 className="text-xl font-bold mt-3">Post Answer</h3>
              <button type="submit" disabled={ answerText ? false : true} className={`${answerText ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-400"} inline-flex items-center rounded-md border  px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                Submit
              </button>
            </div>
              <textarea name="answer" id="answer" cols="50" rows="5" placeholder="Write an answer..." required={token?true:false} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={answerText} onChange={(e) => setAnswerText(e.target.value)}/>
          </form>


          <div>
            <h3 className="text-xl font-bold my-3">Answers</h3>
            {data.answers.length? 
              data.answers.map((a) => (
                <Answer key={a.pk} data={a}>
                  <div className="mr-2 mt-1 flex flex-col align-top">
                    {!data.accepted_answer && <AcceptButton userIsAuthor={userIsAuthor} token={token} data={a} setReloader={setReloader}/>}
                    {token && <FavButton token={token} data={a} setReloader={setReloader} />}
                  </div>
                </Answer>)) :
              
              <div className="h-96 flex items-center justify-center"><h1 className="h-64 text-2xl text-center font-bold text-gray-500">No answers!<br />...Yet</h1></div>}
          </div>
          
        </div>
         {/* <Modal fields={createFields} isOpen={isCreateAnswerOpen} setIsOpen={setIsCreateAnswerOpen} error={ error } /> */}
      </>

    )
  }
  
  return <Loader />

}
 

function QuestionTitle({data}) {
  //https://tailwindui.com/components/application-ui/headings/page-headings
  const navigate = useNavigate()

  const handleNext = () => navigate(`/question/${data.pk + 1}`)
  const handleBack = () => navigate(`/question/${data.pk - 1}`)

  return (

        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:tracking-tight">
            {data.title}
          </h2>
          {/* <BackNext /> */}
        </div>
        
  )
}


function AcceptedAnswer({ data, token, setReloader }) {

  return (
  <div>
    <h3 className="text-xl font-bold mt-3">Best Answer</h3>
    <div className="flex items-top justify-between">
      <div className="mr-2 mt-1 flex flex-col align-top">
          {token && <FavButton token={token} data={data} setReloader={setReloader} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm mt-1"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600 dark:text-violet-300 hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()}</p>
        <p className="text-md mt-1 mb-6">{ data.text }</p>
      </div>
    </div>  
  </div>
  )
}

function BackNext() {
  {/* <div className="flex">
          {data.pk > 1 && <span className=" mr-1">
            <button
              onClick={handleBack}
              type="button"
              className="inline-flex border items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
              <FontAwesomeIcon icon={faCaretLeft} className="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
              Previous
            </button>
          </span>}
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
*/}
}