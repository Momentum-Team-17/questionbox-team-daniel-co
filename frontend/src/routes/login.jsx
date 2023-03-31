import { useState } from "react"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"


class Input {
  constructor(label, type, onChange, icon){
        this.label = label
        this.type = type
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