import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [testData, setTestData] = useState(null);

  useEffect(async ()=> {
    const data = await axios.get("https://express-server-p6vwemgmtq-uc.a.run.app/ethereum");
    console.log({data});
    setTestData(data.data);
  },[])

  useEffect(() => {
    setInterval(() => {
      console.log("outputting from interval");
    }, 60000)
  }, [])

  return (
    <div className="App">
      <h1>Ether Finder</h1>
      { testData }
      <select name="endpoint" id="dropdown">
        <option value="">GET All Addresses</option>
        <option value="">GET Address By ID#</option>
        <option value="">POST New Address</option>
        <option value="">UPDATE Address</option>
        <option value="">DELETE Address</option>
      </select>
      <input></input>
      <input className="submit-btn" type="submit"></input>
      
      <div className="blocks">
      <h3>Latest Blocks</h3>
        <div>
          <h2 className="block">Block T-0</h2>
        </div>
        <div>
          <h2 className="block">Block T-1</h2>
        </div>
        <div>
          <h2 className="block">Block T-2</h2>
        </div>
        <div>
          <h2 className="block">Block T-3</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
