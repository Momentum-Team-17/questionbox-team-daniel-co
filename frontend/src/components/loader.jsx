import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

faSpinner

export default function Loader() {
  
  return (<>
    <div className="flex items-center justify-center h-96">
      <FontAwesomeIcon icon={faSpinner} spin className="h-11 w-11"/>
    </div>
  </>)
}