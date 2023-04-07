import { Tab } from "@headlessui/react"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/loader"
import Question from '../components/question'
import Answer from "../components/answer"
import { Link } from "react-router-dom"


export default function UserPage(props) {
  const [data, setData] = useState()
  const { user } = useParams()
  const [openTab, setOpenTab] = useState("questions")
  const userIsUser = useRef()
  useEffect(() => {
    const URL = 'https://questionbox-mgxz.onrender.com'
    let authT = null
    if (props.token) {
      authT = {headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${props.token}`
      }}
    }

    axios.get(`${URL}/profile/${user}`,
    {
      authT
      }).then((res) => {
      userIsUser.current = user === props.username
      setData(res.data)
    })
  },[])

  if (data) return (
    <div className="">
      <div className="mx-6 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text lg text-lg text-gray-500">User Profile</h1>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:tracking-tight">
            {user}
          </h2>
        </div>
      </div>
      <UserTab userIsUser={userIsUser} data={ data } />
    </div>
  )

  return <Loader />
}


function UserTab({ data, userIsUser }) {
  let tabs = {
    "Questions": "user_questions",
    "Answers":"user_answers"}
  if (userIsUser) {
    tabs["Favorite Questions"] = "fav_questions"
    tabs["Favorite Answers"] = "fav_answers"

  }
  

  return (
     <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1 mx-6 my-4">
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-indigo-700',
                  'ring-white ring-opacity-60 ring-offset-2  focus:outline-none ',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
        {Object.values(tabs).map((panel, idx) =>
          (<Tab.Panel
            key={idx}
            className={'mx-6 rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'}>
            
            {data[panel].map((qOrA) => (
              panel.includes('question') ? 
                <>
                  <h3><Link key={qOrA['time_created']} to={`/question/${qOrA.pk}`} className="text-lg font-bold text-violet-800  hover:underline">{qOrA.title}</Link></h3>
                  <Question data={qOrA} key={qOrA.pk} />
                </> :
                <Answer data={ qOrA} key = {qOrA['time_created']} />
            ))}

          </Tab.Panel>)
        )}
        </Tab.Panels>
      </Tab.Group>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}