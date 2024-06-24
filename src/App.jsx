import { useEffect, useState } from 'react'

import './App.css'

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [users,setUsers] = useState([]);
  const [user,setUser] = useState([]);
  const [clicked, setClicked] = useState(false);

    const handleInputChange = (event) => {
      const userInput = event.target.value;
      setInput(userInput);
      const processedInput = userInput.replace(/\s+/g, '').toLowerCase();
      setOutput(processedInput);
    };

    const handleSearch = async () => {
        const response = await fetch(`https://api.github.com/users/${output}`);
        const FinalData = await response.json();
        setUser(FinalData);
        setClicked(true);
    };

    const getUsers = async () => {
      const response = await fetch("https://api.github.com/users");
      const FinalData = await response.json();
      setUsers(FinalData);
      
      
  }

  

  useEffect(() => {
    getUsers();
  },[])

  


      
  
  return (
    <>
      <div className="font-bold text-white">
        <p className="text-center text-4xl pt-5">Github User Search</p>
      </div>
      
        <form className="flex flex-col lg:flex lg:flex-row justify-center items-center pt-5 mx-[50px] md:mx-[300px] space-x-4">
          <input className="input" value={input} placeholder='search user' onChange={handleInputChange}
           
          ></input>
          <button className="search-btn mt-5 lg:mt-0" onClick={handleSearch}>Search</button>
          
          
        </form>
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {clicked?users.map(user => (
            
            <div className="card" key={user.id}>
              <img src={user.avatar_url} alt="Avatar" />
              <div className="card-body">
                <h2>{user.login}</h2>
                <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
              </div>
            </div>
          )):user.map(user => (
            <div className="card" key={user.id}>
              <img src={user.avatar_url} alt="Avatar" />
              <div className="card-body">
                <h2>{user.login}</h2>
                <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      
    </>
  )
}

export default App;
