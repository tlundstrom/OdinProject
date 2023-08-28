import { useState } from 'react'
import './App.css'
import Announcements from './components/Announcements';

function App() {
  const [data, getData] = useState([]);

  return (
    <Announcements data={data} getData={getData}/>
  )
}

export default App
