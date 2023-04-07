import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { Tooltip } from "@material-tailwind/react";





export default function FavButton({token, data, setReloader}) {

  const handleFavorite = () => { 
    let URL
    let key
    if (data.answers) {
      URL = "https://questionbox-mgxz.onrender.com/questions/favorite"
      key="question_pk"
    } else {
      URL = "https://questionbox-mgxz.onrender.com/answers/favorite" 
      key="answer_pk"
    }
    axios.patch(URL,
      { [key]: data.pk }, 
      {headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
      }).then((res) => {
        setReloader(Math.random())
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }})}

  return(
  <>
    <Tooltip content="Favorite answer" placement="right">
      <button
        onClick={handleFavorite}
        type="button"
        className="mr-1 inline-flex items-center rounded-md border bg-indigo-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {/* Make red if favorited */}
          <FontAwesomeIcon icon={faHeart} className={ data.is_favorite ? "text-red-600" : ""} aria-hidden="true" />
      </button>
    </Tooltip>
  </> )
}
