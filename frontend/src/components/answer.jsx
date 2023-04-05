


export default function Answer({ token, data, setReloader, userIsAuthor, acceptedPk }) {
    const handleAccept = () => {
    const URL = `https://questionbox-mgxz.onrender.com/answers/${data.pk}/accepted`

    axios.patch(URL,
      { "is_accepted" : true}, 
      {headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
      }).then((res) => {
        console.log(res);
        setReloader(Math.random())
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }})}

  const handleFavorite = () => { 
    const URL = "https://questionbox-mgxz.onrender.com/answers/favorite"
    axios.patch(URL,
      { "answer_pk": data.pk }, 
      {headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
      }).then((res) => {
        console.log(res);
        setReloader(Math.random())
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        }})}
  
  return (
     <div className={`${data['is_accepted'] ? "bg-gray-200 pl-1 " : ""}flex items-top justify-between`}>
      <div className="mr-2 mt-1 flex flex-col align-top">
        {userIsAuthor.current && !acceptedPk.current && <Tooltip content="Mark answer as accepted" placement="right">
          <button
            onClick={handleAccept}
            type="button"
            className="inline-flex items-center rounded-md border bg-indigo-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <FontAwesomeIcon icon={faCheck} className={ data['is_accepted'] ? "text-green-500" : ''} aria-hidden="true" />
          </button>
        </Tooltip>}
        <Tooltip content="Favorite answer" placement="right">
          <button
            onClick={handleFavorite}
            type="button"
            className="inline-flex items-center rounded-md border bg-indigo-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {/* Make red if favorited */}
            <FontAwesomeIcon icon={faHeart} className="" aria-hidden="true" />
          </button>
        </Tooltip>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm mt-1"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600 dark:text-violet-300 hover:underline">{data.author}</Link> - { moment(data.time_created,).fromNow()}</p>
        <p className="text-md mt-1 mb-6">{ data.text }</p>
      </div>
    </div>  
  )
}