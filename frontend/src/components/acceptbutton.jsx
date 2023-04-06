

export default function AcceptButton({token, data, setReloader, userIsAuthor, acceptedPk }) {
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
          }
        })
  }
  
  return (
    <>
      {userIsAuthor.current && !acceptedPk.current && <Tooltip content="Mark answer as accepted" placement="right">
        <button
          onClick={handleAccept}
          type="button"
          className="inline-flex items-center rounded-md border bg-indigo-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FontAwesomeIcon icon={faCheck} className={ data['is_accepted'] ? "text-green-500" : ''} aria-hidden="true" />
        </button>
      </Tooltip>}
    </>
  )
}