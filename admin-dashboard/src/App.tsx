
import './App.css'
import SideBar from './components/Sidebar';
import Header from './components/Header';
import DashBoard from './components/Dashboard';

function App() {

  return (
    <div className='wrapper'>
      <SideBar/>
      <Header />
      <DashBoard />
    </div>
  )
}

export default App
