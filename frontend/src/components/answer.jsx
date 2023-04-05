
import moment from "moment"
import { Link } from "react-router-dom"



export default function Answer(props) {
  const data = props.data
  
  return (
     <div className={`${data['is_accepted'] ? "bg-gray-200 pl-1 " : ""}flex items-top justify-between`}>
      {props.children}
      <div className="min-w-0 flex-1">
        <p className="text-sm mt-1"><Link to={`/user/${data.author}`} className="my-1 font-medium text-violet-600 dark:text-violet-300 hover:underline">{data.author}</Link> - {moment(data.time_created,).fromNow()} {data['is_accepted'] && <span className=" italic">- Selected</span>}</p>
        <p className="text-md mt-1 mb-6">{ data.text }</p>
      </div>
    </div>  
  )
}