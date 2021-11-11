import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  //Hook
  const [blocks, setBlocks] = useState([]);
  const [path, setPath] = useState("all");
  const [input, setInput] = useState(0);
  
  useEffect( async () => { 
    await ethBlocks();
    await autoupdate();
    console.log("end of use effect");
  }, [])

  async function ethBlocks(){
    //initial setup
    const initialBlocks = await axios.get("https://ethereum-explorer-p6vwemgmtq-an.a.run.app/ethereum/latest/setup");
    setBlocks(initialBlocks.data);
  }

  async function autoupdate(){
    setInterval(async () => {
      console.log("setInterval is working");
      console.log(blocks);
      console.log(parseInt(blocks[0]));
      const data = await axios.get(`http://localhost:9000/ethereum/latest/:${blocks[0].number}`);
      console.log(data.data);
    }, 20000);
  }

  //Handler
  async function handleSubmit(event){
    let response;
    event.preventDefault();
    switch (path) {
      case 'all':
        console.log("all");
        response = await axios.get("https://ethereum-explorer-p6vwemgmtq-an.a.run.app/alladdress");
        break;
      case 'get':
        console.log("get");
        response = await axios.get(`https://ethereum-explorer-p6vwemgmtq-an.a.run.app/${input}`);
        break;
      case 'post':
        console.log("post");
        response = await axios.post(`https://ethereum-explorer-p6vwemgmtq-an.a.run.app/address/${input}`)
        break;
      case 'update':
        console.log("update");
        response = await axios.patch(`https://ethereum-explorer-p6vwemgmtq-an.a.run.app/${input}`);
        break;
      case 'delete':
        console.log("delete");
        response = await axios.delete(`https://ethereum-explorer-p6vwemgmtq-an.a.run.app/address/${input}`);
        break;
    }
    console.log(response);
  }

  function handlePathChange(event){
    setPath(event.target.value);
  }

  function handleInputChange(event){
    setInput(event.target.value);
  }

  //HTML
  return (
    <div className="App">
      <h1>Ether Finder</h1>

      <form onSubmit={handleSubmit}>
          <select onChange={handlePathChange}>
            <option value="all">GET All Addresses</option>
            <option value="get">GET Address By ID#</option>
            <option value="post">POST New Address</option>
            <option value="update">UPDATE Address</option>
            <option value="delete">DELETE Address</option>
          </select>
          <input type="text" onChange={handleInputChange}/>
        <input type="submit" value="Submit"/>
      </form>
      
      <div className="blocks">
      <h3>Latest Blocks</h3>
        {blocks.map(block => {
          console.log(block);
          return <div
            className="block"
          >
            <a href={`https://etherscan.io/block/${parseInt(block.number)}`}
            >Block#: {parseInt(block.number)}</a>
            <p>Miner: {parseInt(block.miner)}</p>
            <p>Difficulty: {block.miner}</p>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
