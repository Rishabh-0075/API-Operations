import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

const url = "https://fakestoreapi.com/products"

function App() {
  const [myData, setMyData] = useState([]);
  const [isError,setIsError] = useState('');

  const data = {name : "" , email : "" };
  const [inputData, setInputData] = useState(data);
  const [isPostError,setIsPostError] = useState('');

  
  const fetchData = async (url) => {
    try{
      const api = await axios.get(url)   
      setMyData(api.data);
    }
    catch(error){
      setIsError(error.message);
    }
  };

  useEffect(() => {
    fetchData(url); 
  });


  const handleChange = async (e) => {
    await setInputData({...inputData, [e.target.name]:e.target.value})

  }

  const deleteEle = (e) => {
    e.currentTarget.parentElement.parentElement.remove();
    // e.currentTarget.previousElementSibling.remove();
    // e.currentTarget.remove();

  }

  const submitDetails = async (e) => {
    try{
      e.preventDefault();
      await axios.post("https://jsonplaceholder.typicode.com/users", inputData)
      .then((response)=>{
        console.log(response);
      })
    }
    catch(error){
       setIsPostError(error.message);
      console.log(error.message)
    }
    alert("You are Registered");    
  }

  return (
    <>

    <h1>Axios React</h1>
    <h2>API endpoint GET, POST and DELETE methods</h2><hr /><br />
    
    <form >
      <h2> Name : <input type="text" name="name" value={inputData.name} onChange={handleChange} /></h2>
      <h2> Email : <input type="email" name="email" value={inputData.email} onChange={handleChange} /></h2>
      <h2><button onClick={submitDetails} type="Submit">Register</button></h2>
    </form>
    <br /><hr /><br /><br />

    {isError != "" &&  <h2>{isError}</h2> }
    
    <div className='grid'>
    
      {myData.slice(0,12).map((ele)=>{
        const { id, title, description, price} = ele;

        return(
            <div className= "card" key={id} >
              <h3>{title.slice(0,50)}</h3><br />
              {/* <p>{image}</p> */}
              <p>{description.slice(0,120)}...</p><br />
              <p style={{textAlignLast:'end'}}><b>Price:  ${price}</b></p>

            <div className='delButton'>
            <button className='del' onClick={deleteEle} ><b>Delete</b></button>
          </div>
          </div> 
 
        )

      }) }

    </div>

    </>
  )
}

export default App
