import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"




export default function UserPage(params) {
  const [data, setData] = useState()
  const {username} = useParams()
  console.log(username);
  useEffect(() => {
    const URL = 'https://questionbox-mgxz.onrender.com'
    axios.get(`${URL}/auth/users/${username}`).then((res) => {
      setData(res.data)
    })
  },[])

  return null
}