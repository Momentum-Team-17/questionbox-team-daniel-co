import { useLoaderData } from "react-router-dom";


export default function HomePage() {
  const data = useLoaderData()
  console.log(data)
  return <h1>CHILL</h1>
  return (data.map((q) => <Card data={ data } />))
}

function Card({ data }) {
  return (
    <>
      
    </>
  )
}