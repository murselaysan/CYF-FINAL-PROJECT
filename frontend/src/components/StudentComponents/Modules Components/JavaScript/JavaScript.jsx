import React , {useState}from 'react';
import useFetch from "../../../../Auth/useFetch";
import Spinner from "../../../UI/Spinner"
import "./JavaScript.scss";

export default function JavaScript() {
    let { status, data, error } = useFetch('http://localhost:3001/api/Modules/JavaScript/Topics');

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  } else if (status === 'success') {
    return <JavaScriptTopicList data={data} />;
  } else {
    return <Spinner />;
  }

}
  
const JavaScriptTopicList = ({ data }) => {
  const [topics, setTopics] = useState(data);

  return (
    <div>
      <div className="row">
          {topics.map(({ name }) => (
           
              <div className="text-center" key={name}>
               
                <h2 className="">{name}</h2>
            
                </div>
          ))
          }
      </div>
     
    </div>
  )
}