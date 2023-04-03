import { useState } from "react"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"


export class Input {
  constructor(label, type, value, onChange, icon){
        this.label = label
    this.type = type
    this.value = value
        this.onChange = onChange
        this.icon = icon
  }
}

export default function LoginPage(props) {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const onSubmit = () => {
    
  }

  const fields = {
    title: "Login",
    inputs: [new Input("Username", "text", setUserName, { faUser }),
      new Input("Password", "password", setPassword, { faLock })],
    onSubmit: onSubmit
  }
  return (
    <LSCard fields={fields} />
  )
}


function LSCard({fields}) {
  
}