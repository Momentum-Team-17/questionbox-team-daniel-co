import { useState } from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons"



export default function LoginPage(props) {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const fields = {
    inputs: [
      {
        label: "Username",
        type: "text",
        onChange: setUserName,
        icon: { faUser },
      }
    ]
  }
  return (
    <LSCard />
  )
}


function LSCard(props) {
  
}