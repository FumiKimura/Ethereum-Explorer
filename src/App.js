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

  return (
    <div className="App">
      <h1>Hello from Frontend</h1>
      { testData }
    </div>
  );
}

export default App;
